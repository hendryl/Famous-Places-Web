class SelectController {
  constructor(ModeFactory, SocketFactory) {
    'ngInject';

    this.modes = [];

    ModeFactory.getList().success( (result) => {
      this.modes = result;
    });

    console.log(SocketFactory);
  }
}

export default SelectController;
