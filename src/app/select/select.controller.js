class SelectController {
  constructor($log, _, SocketFactory, ModeFactory, GameFactory, GameService) {
    'ngInject';

    this.$log = $log;
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
      this.GameService.retrieveImages();

      //TODO: change state to next page
    }, (error) => {
      this.$log.log(error);
    });
  }
}

export default SelectController;
