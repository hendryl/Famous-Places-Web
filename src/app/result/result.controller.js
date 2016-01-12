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

      } else if(message.type === 'player_select') {
        this.handlePlayerSelect(message);
      }
    }
  }

  handlePlayerCreate(playerId) {
    const player = this._.find(this.GameService.players, (n) => n.id === playerId);
    this.toastr.info(player + ' is creating a new game.');
  }

  handlePlayerSelect(message) {
    const mode_id = message.mode_id;

    this.GameFactory.createGame(mode_id).then((result) => {
      this.toastr.info('Moving to lobby');

      this.GameService.storeGameData(result.data);
      this.GameService.retrieveAssets();

      const player = this._.find(this.GameService.players, (n) => n.id === message.player);
      this.GameService.players = [{
        name: player.name,
        id: player.id,
        score: 0,
        lastAnswer: null
      }];

      this.$state.go('lobby');
    }, (error) => {
      this.$log.log(error);
    });
  }
}

export default ResultController;
