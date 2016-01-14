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

    this.winners = [];

    SocketService.extendedHandler = (message) => {
      if (message.type === 'player_create') {
        this.handlePlayerCreate(message.player);

      } else if (message.type === 'player_select') {
        this.handlePlayerSelect(message);
      }
    }

    this.players = [{
      name: 'player 1',
      score: 1235,
      id: 123123132132,
      lastAnswer: null
    }];

    // this.players = [{
    //   name: 'player 1',
    //   score: 1235,
    //   id: 123123132132,
    //   lastAnswer: null
    // },
    // {
    //   name: 'player 2',
    //   score: 3335,
    //   id: 12312317712,
    //   lastAnswer: null
    // },
    // {
    //   name: 'player 3',
    //   score: 4235,
    //   id: 123123152132,
    //   lastAnswer: null
    // },
    // {
    //   name: 'player 4',
    //   score: 2235,
    //   id: 123999132132,
    //   lastAnswer: null
    // }];

    this.sortWinners();
    this.$log.log(this.winners);
  }

  sortWinners() {
    let counter = 0;
    this.winners = this._.chain(this.players.slice(0))
      .each(p => {
        p.number = counter;
        counter += 1;
      })
      .sortBy(p => p.score)
      .value()
      .reverse();
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
      this.$log.debug(error);
    });
  }
}

export default ResultController;
