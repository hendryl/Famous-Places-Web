class NavbarDirective {
  constructor() {
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
  constructor($state, $localStorage, AudioService, audioOn, audioOff) {
    'ngInject';

    this.$state = $state;
    this.$storage = $localStorage;
    this.AudioService = AudioService;

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

    if ($storage.audioStatus === audioOn) {
      this.AudioService.playMusic();
    } else {
      this.AudioService.pauseMusic();
    }
  }

  shouldHideLogo() {
    return this.$state.is('home');
  }

  shouldHideAboutButton() {
    return !(this.$state.is('home') || this.$state.is('about'));
  }

  handleAbout() {
    const $state = this.$state;

    if ($state.is('home')) {
      $state.go('about');
    } else {
      $state.go('home');
    }
  }
}

export default NavbarDirective;
