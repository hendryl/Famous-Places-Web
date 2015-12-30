class MainController {
  constructor ($state, $localStorage, baseMusic, audioOn, AudioService, SocketService) {
    'ngInject';

    this.$state = $state;
    this.$storage = $localStorage.$default({
      audioStatus: audioOn
    });

    if(AudioService.shouldPlayMusic(baseMusic)) {
      var music = AudioService.prepareMusic(baseMusic);
      AudioService.playMusic(music);
    }

    SocketService.connect().then(function(result) {
      console.log('success');
      console.log(SocketService.socket);
      SocketService.close();
    });
  }

  play() {
    this.$state.go('select');
  }
}

export default MainController;
