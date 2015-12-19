const AudioPlayer = new WeakMap();

class AudioPlayerService {
  constructor(ngAudio) {
    'ngInject';

    AudioPlayer.set(this, ngAudio);
  }

  play(music) {
    if (music == null) {
      return;
    }

    this.audio = AudioPlayer.get(this).load(music);
    this.audio.play();
  }

  stop() {
    if (this.audio != null) {
      this.audio.stop();
    }
  }
}

export default AudioPlayerService;
