class GameService {
  constructor(_, $log, $q, ImageFactory) {
    'ngInject';
    this.$log = $log;
    this.ImageFactory = ImageFactory;
    this.$q = $q;
    this._ = _;

    this.game_id = 0;
    this.questions = [];
    this.socketRoom = '';
  }

  storeGameData(data) {
    this.game_id = data.game_id;
    this.socketRoom = data.password;
    this.questions = data.questions;
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
}

export default GameService;
