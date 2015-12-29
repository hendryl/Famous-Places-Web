const soundFiles = [];

class AudioService {
  constructor(_, $q, Howl, Howler, $localStorage, audioOn) {
    'ngInject';

    this._ = _;
    this.$q = $q;
    this.Howl = Howl;
    this.Howler = Howler;
    this.local = $localStorage;
    this.audioOn = audioOn;

    this.sounds = [];

    this.prepareSound();
  }

  prepareSound() {
    this.sounds = this._.each(soundFiles, (soundFile) => {
      var sound = new this.Howl({
        src: [soundFile.url],
        loop: false,
        preload: true,
        html5: true
      });

      sound.name = soundFile.name;
      return sound;
    });
  }

  prepareMusic(url, loop = true) {
    return new this.Howl({
      src: [url],
      loop: loop,
      preload: true,
      html5: true
    });
  }

  playSound(name) {
    const sound = this._.find(this.sounds, (sound) => sound.name === name)

    if (sound == null) {
      return;
    }

    sound.play();
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
      if (this.music.playing(this.music)) {
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
