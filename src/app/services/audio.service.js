const soundFiles = [];

class AudioService {
  constructor($log, _, $q, Howl, Howler, $localStorage, audioOn, baseMusic) {
    'ngInject';

    this._ = _;
    this.$q = $q;
    this.$log = $log;
    this.Howl = Howl;
    this.Howler = Howler;
    this.local = $localStorage;
    this.audioOn = audioOn;

    this.sounds = [];

    //this.prepareSound();
  }

  prepareSound(soundFiles) {
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

    if (this.music) {
      this.stopMusic();
      this.music = null;
    }

    this.music = new this.Howl({
      src: [url],
      loop: loop,
      preload: true,
      html5: true
    });

    this.music.isPlaying = false;
  }

  playSound(name) {
    const sound = this._.find(this.sounds, (sound) => sound.name === name)

    if (sound == null) {
      return;
    }

    sound.play();
  }

  playMusic() {
    if (this.music != null) {
      this.music.play();
      this.music.isPlaying = true;
    }
  }

  pauseMusic() {
    if (this.music != null) {
      this.music.pause();
      this.music.isPlaying = false;
    }
  }

  stopMusic() {
    if (this.music != null) {
      this.music.stop();
      this.music.isPlaying = false;
    }
  }
}

export default AudioService;
