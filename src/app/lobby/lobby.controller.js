class LobbyController {
  constructor(GameService, SocketFactory) {
    'ngInject';

    this.game_id = GameService.game_id;
    this.password = GameService.roomName;
    this.GameService = GameService;
    this.socket = SocketFactory.ioSocket;
  }
}

export default LobbyController;
