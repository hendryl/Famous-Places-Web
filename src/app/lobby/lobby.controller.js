class LobbyController {
  constructor(_, $state, $scope, toastr, $log, $location, GameService, SocketService) {
    'ngInject';

    this._ = _;
    this.$log = $log;
    this.$state = $state;
    this.$scope = $scope;
    this.toastr = toastr;
    this.GameService = GameService;
    this.SocketService = SocketService;

    this.game_id = GameService.game_id;
    this.password = GameService.roomName;
    this.players = GameService.players;

    this.mobileAddress = 'fpmobile.bitballoon.com';

    SocketService.connect().then((result) => {
      this.$log.log('success');

      this.SocketService.extendedHandler = (message) => {
        if (message.type === 'join_room') {
          this.handleJoinRoomMessage(message);
        }

        if(message.type === 'players_ready') {
          this.handlePlayersReady();
        }

        if (message.type === 'player_disconnect') {
          this.handlePlayerDisconnect(message);
        }
      };

      SocketService.createRoom(this.password);
    });
  }

  handleJoinRoomMessage(message) {
    this.players.push({
      name: message.name,
      id: message.id
    });

    this.toastr.success(message.name + ' has connected.');

    this.$scope.$apply(() => {
      this.$scope.players = this.players;
    });
  }

  handlePlayersReady() {
    this.$state.go('loading');
  }

  handlePlayerDisconnect(message) {
    const _ = this._;
    const index = _.chain(this.players)
      .map((n) => n.id)
      .indexOf(message.id)
      .value();

    if (index != -1) {
      this.toastr.warning(this.players[index].name + ' has disconnected.');
      _.remove(this.players, (n) => n.id === message.id);

      this.$scope.$apply(() => {
        this.$scope.players = this.players;
      });
    } else {
      this.$log.error('Player with id ' + message.id + ' not found!');
    }
  }

  isPlayerConnected(number) {
    return this.players[number] != null;
  }
}

export default LobbyController;
