class GameController {
  constructor($log, GameService, SocketService) {
    'ngInject';

    this.$log = $log;
    this.GameService = GameService;
    this.SocketService = SocketService;
  }
}

export default GameController;
