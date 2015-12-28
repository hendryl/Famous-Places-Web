class GameService {
  constructor(_, $log, $q, ImageFactory, AudioService, Howl) {
    'ngInject';
    this._ = _;
    this.$q = $q;
    this.$log = $log;
    this.Howl = Howl;
    this.ImageFactory = ImageFactory;
    this.AudioService = AudioService;

    this.game_id = 0;
    this.questions = [];
    this.musicURL = '';
    this.socketRoom = '';

    this.ready = {
      questions: false,
      music: false,
      sound: false
    }
  }

  storeGameData(data) {
    this.game_id = data.game_id;
    this.socketRoom = data.password;
    this.questions = data.questions;
    this.musicURL = '';
  }

  retrieveAssets() {
    this.retrieveImages();
    this.retrieveSounds();
  }

  retrieveImages() {
    const _ = this._;

    const promises = _.chain(this.questions)
      .map((question) => question.photo_id)
      .map((id) => this.ImageFactory.getImage(id))
      .value();

    this.$q.all(promises).then((results) => {
      this.questions = _.each(this.questions, (question) => {
        question.photo = results.shift().data;
      });

      //TODO: preload images!
    });
  }

  retrieveSounds() {
    this.music = this.AudioService.prepareMusic(this.musicURL);

    this.music.on('load', () => {
      this.ready.music = true;
    });
  }

  playMusic() {
    this.AudioService.play(this.music, true)
  }
}

export default GameService;
