class SelectController {
  constructor(ModeFactory, SocketFactory, GameFactory, _) {
    'ngInject';

    this.modes = [];
    this.buttonDisabled = false;
    this.GameFactory = GameFactory;

    ModeFactory.getList().success( (result) => {
      this.modes = _.sortBy(result, (n) => n.mode_id);
    });
  }

  selectGameMode(mode_id) {
    this.buttonDisabled = true;

    this.GameFactory.createGame(mode_id).then(function(result) {
      console.log(result);
    }, function(error) {
      console.log(error);
    });

  }
}

export default SelectController;
