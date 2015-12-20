class AudioPlayerService {
  constructor(ngAudio, $localStorage, $sessionStorage, audioOn) {
    'ngInject';

    this.ngAudio = ngAudio;
    this.local = $localStorage;
    this.session = $sessionStorage;
    this.audioOn = audioOn;
  }

  play(loop = true) {
    if (this.audio) {
      this.stop();
    }

    this.audio = this.ngAudio.load(this.session.currentMusic);
    this.audio.loop = loop;
    this.audio.play();
  }

  playPause() {
    if (this.audio != null) {
      if(this.audio.paused) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
    } else {
      this.play();
    }
  }

  stop() {
    if (this.audio != null) {
      this.audio.stop();
    }
  }

  shouldPlayMusic() {
    if (this.local.audioStatus === this.audioOn) {
      if (this.audio == null) {
        return true;
      } else if (this.audio.id !== this.session.currentMusic) {
        return true;
      }
    }

    return false;
  }
}

export default AudioPlayerService;
