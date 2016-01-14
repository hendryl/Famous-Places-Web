class LobbyController {
  constructor(_, $state, $scope, toastr, $log, $location, GameService, SocketService, AudioService) {
    'ngInject';

    this._ = _;
    this.$log = $log;
    this.$state = $state;
    this.$scope = $scope;
    this.toastr = toastr;
    this.GameService = GameService;
    this.SocketService = SocketService;
    this.AudioService = AudioService;

    this.game_id = GameService.game_id;
    this.password = GameService.roomName;
    this.players = GameService.players;

    this.mobileAddress = 'fpmobile.bitballoon.com';

    $scope.$on('server_disconnect', function(event, args) {
      alert('Server disconnected. Game ended.');
      $state.go('home');
    });

    if (this.SocketService.isConnected()) {
      this.SocketService.send({
        type: 'rename',
        room: this.password,
        game_id: this.game_id
      });

    } else {
      this.connect();
    }

    this.SocketService.extendedHandler = (message) => {
      if (message.type === 'join_room') {
        this.handleJoinRoomMessage(message);
      }

      if (message.type === 'players_ready') {
        this.handlePlayersReady();
      }

      if (message.type === 'player_disconnect') {
        this.handlePlayerDisconnect(message);
      }
    };
  }

  connect() {
    this.SocketService.connect().then((result) => {
      this.$log.debug('success');
      this.SocketService.createRoom(this.game_id, this.password);
    });
  }

  handleJoinRoomMessage(message) {
    this.players.push({
      name: message.name,
      id: message.id,
      score: 0,
      lastAnswer: null
    });

    this.AudioService.playSound('blub');
    this.toastr.success(message.name + ' has connected.');

    this.$scope.$apply(() => {
      this.$scope.players = this.players;
    });
  }

  handlePlayersReady() {
    this.$state.go('loading');
  }

  handlePlayerDisconnect(message) {
    const toastrMessage = this.GameService.handlePlayerDisconnect(message);

    this.toastr.warning(toastrMessage);
    this.$scope.$apply(() => {
      this.$scope.players = this.players;
    });
  }

  isPlayerConnected(number) {
    return this.players[number] != null;
  }
}

export default LobbyController;
