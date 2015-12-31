class LobbyController {
  constructor($scope, $log, $location, GameService, SocketService) {
    'ngInject';

    this.$log = $log;
    this.$scope = $scope;
    this.GameService = GameService;
    this.SocketService = SocketService;

    this.game_id = GameService.game_id;
    this.password = GameService.roomName;
    this.players = GameService.players;

    this.mobileAddress = $location.host() +'/m';

    SocketService.connect().then((result) => {
      this.$log.log('success');

      this.SocketService.extendedHandler = (message) => {
        if(message.type === 'join_room') {
          this.players.push({
            name: message.name,
            id: message.id
          });
          $scope.$apply( () =>{
            $scope.players = this.players;
          });
        }

        //TODO: handle player disconnect
      };

      SocketService.createRoom(this.password);
    });
  }

  isPlayerConnected(number) {
    return this.players[number] != null;
  }
}

export default LobbyController;
