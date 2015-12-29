class LobbyController {
  constructor($location, GameService, SocketFactory) {
    'ngInject';

    this.game_id = GameService.game_id;
    this.password = GameService.roomName;
    this.GameService = GameService;
    this.socket = SocketFactory.ioSocket;

    this.mobileAddress = $location.host() +'/m';
  }
}

export default LobbyController;
