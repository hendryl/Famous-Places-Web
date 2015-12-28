class AudioService {
  constructor(Howl, Howler, $localStorage, audioOn) {
    'ngInject';

    this.Howl = Howl;
    this.Howler = Howler;
    this.local = $localStorage;
    this.audioOn = audioOn;
  }

  prepareMusic(url, loop = true) {
    return new this.Howl({
      src: [url],
      loop: loop,
      preload: true,
      html5: true
    });
  }

  playMusic(music, loop = true, autoplay = true) {
    if (this.music) {
      this.stopMusic();
    }

    this.music = music;
    this.music.play();
  }

  tooglePauseMusic() {
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
      this.music.stop();
    }
  }

  shouldPlayMusic(music) {
    if (this.local.audioStatus === this.audioOn) {
      if (this.music == null) {
        return true;
      } else if (this.music._src !== music) {
        return true;
      }
    }

    return false;
  }
}

export default AudioService;
