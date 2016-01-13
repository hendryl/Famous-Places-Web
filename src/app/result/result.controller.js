class ResultController {
  constructor($state, $log, SocketService, GameService, toastr, _, GameFactory) {
    'ngInject';

    this._ = _;
    this.$log = $log;
    this.$state = $state;
    this.GameService = GameService;
    this.GameFactory = GameFactory;
    this.players = GameService.players;
    this.toastr = toastr;
    this.gameCreator = null;

    SocketService.extendedHandler = (message) => {
      if(message.type === 'player_create') {
        this.handlePlayerCreate(message.player);

      } else if(message.type === 'player_select') {
        this.handlePlayerSelect(message);
      }
    }
  }

  handlePlayerCreate(playerId) {
    this.gameCreator = this._.find(this.GameService.players, (n) => n.id === playerId);
    this.toastr.info(this.gameCreator.name + ' is creating a new game.');
  }

  handlePlayerSelect(message) {
    const mode_id = message.mode_id;

    this.GameFactory.createGame(mode_id).then((result) => {
      this.toastr.info('Moving to lobby.');

      this.GameService.storeGameData(result.data);
      this.GameService.retrieveAssets();

      this.GameService.players = [{
        name: this.gameCreator.name,
        id: this.gameCreator.id,
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
