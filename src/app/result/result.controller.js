class ResultController {
  constructor(SocketService, GameService, toastr, _, GameFactory) {
    'ngInject';

    this._ = _;
    this.GameService = GameService;
    this.players = GameService.players;
    this.toastr = toastr;

    SocketService.extendedHandler = (message) => {
      if(message.type === 'player_create') {
        this.handlePlayerCreate(message.player);

      }
    }
  }

  handlePlayerCreate(playerId) {
    const player = this._.find(this.GameService.players, (n) => n.id === playerId);
    this.toastr.info(player + ' is creating a new game.');
  }
}

export default ResultController;
