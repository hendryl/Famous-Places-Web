class SelectController {
  constructor(ModeFactory, SocketFactory) {
    'ngInject';

    this.modes = [];

    ModeFactory.getList().success( (result) => {
      this.modes = _.sortBy(result, (n) => n.mode_id);
    });

  }
}

export default SelectController;
