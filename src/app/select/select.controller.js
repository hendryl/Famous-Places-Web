class SelectController {
  constructor(ModeFactory, SocketFactory, GameFactory, $log, _) {
    'ngInject';

    this.$log = $log;
    this.GameFactory = GameFactory;

    this.modes = [];
    this.buttonDisabled = false;

    ModeFactory.getList().success( (result) => {
      this.modes = _.sortBy(result, (n) => n.mode_id);
    });
  }

  selectGameMode(mode_id) {
    this.buttonDisabled = true;

    this.GameFactory.createGame(mode_id).then(function(result) {
      this.$log.log(result);
    }, function(error) {
      this.$log.log(error);
    });

  }
}

export default SelectController;
