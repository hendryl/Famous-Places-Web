class AudioPlayerService {
  constructor(Howl, Howler, $localStorage, $sessionStorage, audioOn) {
    'ngInject';

    this.Howl = Howl;
    this.Howler = Howler;
    this.local = $localStorage;
    this.session = $sessionStorage;
    this.audioOn = audioOn;
  }

  playMusic(loop = true, autoplay = true) {
    if (this.music) {
      this.stopMusic();
    }

    this.music = new this.Howl({
      src: [this.session.currentMusic],
      loop: loop,
      autoplay: autoplay,
      html5: true,
    });
  }

  playPauseMusic() {
    if (this.music != null) {
      if(this.music.playing(this.music)) {
        this.music.pause();
      } else {
        this.music.play();
      }
    } else {
      this.playMusic();
    }
  }

  stopMusic() {
    if (this.music != null) {
      this.music.pause();
    }
  }

  shouldPlayMusic() {
    if (this.local.audioStatus === this.audioOn) {
      if (this.music == null) {
        return true;
      } else if (this.music._src !== this.session.currentMusic) {
        return true;
      }
    }

    return false;
  }
}

export default AudioPlayerService;
