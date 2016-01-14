class MainController {
  constructor($log, $state, $timeout, $localStorage, baseMusic, audioOn, AudioService) {
    'ngInject';

    this.$state = $state;
    this.AudioService = AudioService;
    this.$storage = $localStorage.$default({
      audioStatus: audioOn
    });

    $timeout( () => {
      if (AudioService.music == null || AudioService.music._src !== baseMusic) {
        var music = AudioService.prepareMusic(baseMusic);
        AudioService.setMusic(music);
      }

      if (!AudioService.music.isPlaying && this.$storage.audioStatus === audioOn) {
        AudioService.playMusic();
      }
    }, 1000);
  }

  play() {
    this.AudioService.playSound('button');
    this.$state.go('select');
  }
}

export default MainController;
