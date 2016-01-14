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
    },
    {
      name: 'player 2',
      score: 3335,
      id: 12312317712,
      lastAnswer: null
    },
    {
      name: 'player 3',
      score: 4235,
      id: 123123152132,
      lastAnswer: null
    },
    {
      name: 'player 4',
      score: 2235,
      id: 123999132132,
      lastAnswer: null
    }];

    this.sortWinners();
    this.$log.log(this.winners);
  }

  sortWinners() {
    let counter = 0;
    this.winners = this._.chain(this.players.slice(0))
      .each(p => {
        p.number = counter;
        counter += 1;
        p.rating = this.getRating(p.score);
        p.flavor = this.getFlavorText(p.score);
      })
      .sortBy(p => p.score)
      .value()
      .reverse();
  }

  getRating(score) {
    if(score < 1000) {
      return 'E';

    } else if(score < 2000) {
      return 'D';

    } else if(score < 3000) {
      return 'C';

    } else if(score < 4000) {
      return 'B';

    } else if(score < 4900) {
      return 'A';

    } else return 'S';
  }

  getFlavorText(score) {
    if(score < 100) {
      return '........';

    } else if(score < 1000) {
      return 'Try harder!';

    } else if(score < 2000) {
      return 'Try harder!';

    } else if(score < 3000) {
      return 'Not bad! Play some more and get B rating!';

    } else if(score < 4000) {
      return 'Well Done! Try to get A rating!';

    } else if(score < 4900) {
      return 'Awesome!! Just a little more for S rating!';

    } else if(score < 5000) {
      return 'Awesome!! Just a bit more for the perfect score!';

    } else {
      return 'PERFECT SCOREEEE!!! AMAZINGGGG!!!';
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
      this.$log.debug(error);
    });
  }
}

export default ResultController;
