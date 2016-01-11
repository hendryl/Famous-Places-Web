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
    this.soundFiles = [];
    //this.prepareSound();
  }

  prepareSound() {
    this.sounds = this._.each(this.soundFiles, (soundFile) => {
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
    var music = new this.Howl({
      src: [url],
      loop: loop,
      preload: true,
      html5: true
    });

    music.isPlaying = false;

    return music;
  }

  setMusic(music) {
    if (this.music) {
      this.stopMusic();
      this.music = null;
    }

    this.music = music;
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
      this.music.fade(0, 1, 1000);
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

  fadeToStop() {
    if (this.music != null) {
      this.music.fade(1, 0, 1000);
      this.music.onfaded = () => {
        this.stopMusic();
      }
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
