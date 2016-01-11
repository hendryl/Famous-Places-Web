class GameService {
  constructor(_, $log, $q, $localStorage, ImageFactory, AudioService, audioOn) {
    'ngInject';
    this._ = _;
    this.$q = $q;
    this.$log = $log;
    this.$storage = $localStorage;
    this.ImageFactory = ImageFactory;
    this.AudioService = AudioService;
    this.audioOn = audioOn;

    this.currentQuestion = 0;

    this.game_id = 0;
    this.questions = [];
    this.musicURL = '';
    this.roomName = '';
    this.players = [];

    this.ready = {
      images: false,
      music: false
    };
  }

  isGameReady() {
    return this.ready.images && this.ready.music;
  }

  getRound() {
    return this.currentQuestion;
  }

  getQuestion(number) {
    return this.questions[number];
  }

  canMoveToNextQuestion() {
    if (this.currentQuestion + 1 >= this.questions.length) {
      return false;
    }

    return true;
  }

  moveToNextQuestion() {
    this.currentQuestion += 1;
  }

  handlePlayerDisconnect(message) {
    const _ = this._;
    const index = _.chain(this.players)
      .map((n) => n.id)
      .indexOf(message.id)
      .value();

    if (index != -1) {
      const player = _.remove(this.players, (n) => n.id === message.id);
      return player[0].name + ' has disconnected.';

    } else {
      this.$log.error('Player with id ' + message.id + ' not found!');
    }
  }

  storeGameData(data) {
    const _ = this._;

    this.game_id = data.game_id;
    this.roomName = data.password;
    this.questions = _.shuffle(data.questions);
    this.musicURL = data.music;
  }

  retrieveAssets() {
    this.retrieveImages();
    this.retrieveMusic();
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

      this.preloadImages();
    });
  }

  preloadImages() {
    const _ = this._;

    var promises = [];

    var createPromises = (array) => {
      _.each(array, (value) => {
        return this.$q((resolve, reject) => {
          var image = new Image();
          image.onload = () => resolve(true);
          image.src = value;
        });
      });
    };

    var imageArray = _.map(this.questions, (question) => question.photo.url);
    var flagArray = _.map(this.questions, (question) => question.flag);
    promises.push(createPromises(imageArray));
    promises.push(createPromises(flagArray));

    this.$q.all(promises).then(results => this.ready.images = true);
  }

  retrieveMusic() {
    this.music = this.AudioService.prepareMusic(this.musicURL);
    this.music.on('load', () => {
      this.ready.music = true;
    });
  }

  playMusic() {
    let canPlayMusic = () => {
      if (this.$storage.audioStatus === this.audioOn) {
        this.AudioService.playMusic();
      }
    };

    if (this.AudioService.music._src !== this.music._src) {
      this.AudioService.setMusic(this.music);

      canPlayMusic();
    } else canPlayMusic();
  }
}

export default GameService;
