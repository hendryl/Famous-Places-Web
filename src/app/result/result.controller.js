class ResultController {
  constructor(SocketService, GameService, toastr, _) {
    'ngInject';

    this.GameService = GameService;
    this.players = GameService.players;

    SocketService.extendedHandler = (message) => {
      if(message.type === 'player_create') {
        const player = _.find(GameService.players, (n) => n.id === message.player);

        toastr.info(player + ' is creating a new game.');
      }
    }
  }
}

export default ResultController;
