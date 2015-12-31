class LobbyController {
  constructor(_, $scope, toastr, $log, $location, GameService, SocketService) {
    'ngInject';

    this._ = _;
    this.$log = $log;
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
          this.players.push({
            name: message.name,
            id: message.id
          });

          toastr.success(message.name + ' has connected.');

          $scope.$apply(() => {
            $scope.players = this.players;
          });
        }

        if (message.type === 'player_disconnect') {
          const _ = this._;
          const index = _.chain(this.players)
            .map((n) => n.id)
            .indexOf(message.id)
            .value();

          if (index != -1) {
            toastr.warning(this.players[index].name + ' has disconnected.');
            _.remove(this.players, (n) => n.id === message.id);

            $scope.$apply(() => {
              $scope.players = this.players;
            });
          } else {
            this.$log.error('Player with id ' + message.id + ' not found!');
          }
        }
      };

      SocketService.createRoom(this.password);
    });
  }

  isPlayerConnected(number) {
    return this.players[number] != null;
  }
}

export default LobbyController;
