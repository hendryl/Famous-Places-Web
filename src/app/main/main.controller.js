class MainController {
  constructor($log, $state, $localStorage, baseMusic, audioOn, AudioService) {
    'ngInject';

    this.$state = $state;
    this.$storage = $localStorage.$default({
      audioStatus: audioOn
    });

    if (AudioService.music == null) {
      var music = AudioService.prepareMusic(baseMusic);
      AudioService.setMusic(music);
    }

    if (!AudioService.music.isPlaying && this.$storage.audioStatus === audioOn) {
      AudioService.playMusic();
    }
  }

  play() {
    this.$state.go('select');
  }
}

export default MainController;
