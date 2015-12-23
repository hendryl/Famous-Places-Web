class NavbarDirective {
  constructor () {
    'ngInject';

    return {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      controller: NavbarController,
      controllerAs: 'nav',
      bindToController: true
    };
  }
}

class NavbarController {
  constructor ($state, $localStorage, AudioPlayerService, audioOn, audioOff) {
    'ngInject';

    this.$state = $state;
    this.$storage = $localStorage;
    this.AudioPlayerService = AudioPlayerService;

    this.props = {
      enterFull: "fullscreen",
      exitFull: "fullscreen_exit",
      audioOn: audioOn,
      audioOff: audioOff
    };

    this.fullscreen = this.props.enterFull;
    this.aboutText = $state.is('home') ? "ABOUT" : "HOME";
  }

  toggleFullscreen() {
    const enterFull = this.props.enterFull;
    const exitFull = this.props.exitFull;

    this.fullscreen = this.fullscreen === enterFull ? exitFull : enterFull;
  }

  toggleAudio() {
    const $storage = this.$storage;
    const audioOn = this.props.audioOn;
    const audioOff = this.props.audioOff;

    $storage.audioStatus = $storage.audioStatus === audioOn ? audioOff : audioOn;

    this.AudioPlayerService.playPause();
  }

  shouldHideAboutButton() {
    const $state = this.$state;
    if($state.is('home') || $state.is('about')) {
      return false;
    }
    return true;
  }

  handleAbout() {
    const $state = this.$state;

    if($state.is('home')) {
      $state.go('about');
    } else {
      $state.go('home');
    }
  }
}

export default NavbarDirective;
