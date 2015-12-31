class LobbyController {
  constructor($location, GameService, SocketService) {
    'ngInject';

    this.game_id = GameService.game_id;
    this.password = GameService.roomName;
    this.GameService = GameService;

    this.mobileAddress = $location.host() +'/m';

    SocketService.connect().then(function(result) {
      $log.log('success');
      SocketService.createRoom(this.password);
    });
  }
}

export default LobbyController;
