class MainController {
  constructor ($state, $localStorage, baseMusic, audioOn, AudioService) {
    'ngInject';

    this.$state = $state;
    this.$storage = $localStorage.$default({
      audioStatus: audioOn
    });

    if(AudioService.shouldPlayMusic(baseMusic)) {
      var music = AudioService.prepareMusic(baseMusic);
      AudioService.playMusic(music);
    }
  }

  play() {
    this.$state.go('select');
  }
}

export default MainController;
