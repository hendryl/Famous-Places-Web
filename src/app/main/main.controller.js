class MainController {
  constructor ($state, $localStorage, $sessionStorage, baseMusic, audioOn, AudioPlayerService) {
    'ngInject';

    this.$state = $state;
    this.$storage = $localStorage.$default({
      audioStatus: audioOn
    });

    $sessionStorage.currentMusic = baseMusic;

    if(AudioPlayerService.shouldPlayMusic()) {
      AudioPlayerService.play();
    }
  }

  play() {
    this.$state.go('select');
  }
}

export default MainController;
