class MainController {
  constructor ($state, $localStorage, baseMusic, audioOn, AudioService) {
    'ngInject';

    this.$state = $state;
    this.$storage = $localStorage.$default({
      audioStatus: audioOn
    });

    if(AudioService.shouldPlayMusic(baseMusic)) {
      AudioService.playMusic();
    }
  }

  play() {
    this.$state.go('select');
  }
}

export default MainController;
