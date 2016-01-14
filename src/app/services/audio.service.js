const soundFiles = [
  {
    name: 'blup',
    url:'https://dl.dropboxusercontent.com/u/13188176/Famous%20Places/Sound/blub.mp3'
  },
  {
    name: 'button',
    url:'https://dl.dropboxusercontent.com/u/13188176/Famous%20Places/Sound/button.mp3'
  },
  {
    name: 'ping',
    url:'https://dl.dropboxusercontent.com/u/13188176/Famous%20Places/Sound/ping.mp3'
  },
  {
    name: 'tada',
    url:'https://dl.dropboxusercontent.com/u/13188176/Famous%20Places/Sound/tada.mp3'
  },
  {
    name: 'tick',
    url:'https://dl.dropboxusercontent.com/u/13188176/Famous%20Places/Sound/tick.mp3'
  }
];

class AudioService {
  constructor($log, _, $q, Howl, Howler, $localStorage, audioOn, baseMusic) {
    'ngInject';

    this._ = _;
    this.$q = $q;
    this.$log = $log;
    this.Howl = Howl;
    this.Howler = Howler;
    this.$storage = $localStorage;
    this.audioOn = audioOn;

    this.sounds = [];

    this.prepareSound();
  }

  prepareSound() {
    this.sounds = this._.map(soundFiles, (soundFile) => {
      let sound = new this.Howl({
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
      this.$log.debug('sound is null');
      return;
    }


    if(this.$storage.audioStatus === this.audioOn) {
      sound.play();
    } else {
      this.$log.debug('audio not on');
    }
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
