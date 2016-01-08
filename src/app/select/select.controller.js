class SelectController {
  constructor($log, _, $state, $localStorage, audioOn, ModeFactory, GameFactory, GameService, AudioService, lobbyMusic) {
    'ngInject';

    this._ = _;
    this.$log = $log;
    this.$state = $state;
    this.GameFactory = GameFactory;
    this.GameService = GameService;

    this.modes = [];
    this.buttonDisabled = false;

    ModeFactory.getList().success((result) => {
      this.modes = _.sortBy(result, (n) => n.mode_id);
    });


    const music = AudioService.prepareMusic(lobbyMusic);
    AudioService.setMusic(music);

    if ($localStorage.audioStatus === audioOn) {
      AudioService.playMusic();
    }
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
