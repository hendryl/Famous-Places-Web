class SelectController {
  constructor($log, _, $state, ModeFactory, GameFactory, GameService) {
    'ngInject';

    this._ = _;
    this.$log = $log;
    this.$state = $state;
    this.GameFactory = GameFactory;
    this.GameService = GameService;

    this.modes = [];
    this.buttonDisabled = false;

    ModeFactory.getList().success( (result) => {
      this.modes = _.sortBy(result, (n) => n.mode_id);
    });
  }

  selectGameMode(mode_id) {
    this.buttonDisabled = true;

    this.GameFactory.createGame(mode_id).then((result) => {
      this.$log.log(result);
      this.GameService.storeGameData(result.data);
      this.GameService.retrieveAssets();

      this.$state.go('lobby');
    }, (error) => {
      this.$log.log(error);
    });
  }
}

export default SelectController;
