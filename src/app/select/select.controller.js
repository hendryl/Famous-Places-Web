class SelectController {
  constructor(ModeFactory) {
    'ngInject';

    this.modes = [];

    ModeFactory.getList().success( (result) => {
      this.modes = result;
    });
  }
}

export default SelectController;
