class LobbyController {
  constructor($log, $location, GameService, SocketService) {
    'ngInject';

    this.$log = $log;
    this.game_id = GameService.game_id;
    this.password = GameService.roomName;
    this.GameService = GameService;

    this.mobileAddress = $location.host() +'/m';

    SocketService.connect().then((result) => {
      this.$log.log('success');
      SocketService.createRoom(this.password);
    });
  }
}

export default LobbyController;
