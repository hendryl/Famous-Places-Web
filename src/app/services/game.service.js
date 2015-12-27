class GameService {
  constructor($log) {
    'ngInject';
    this.$log = $log;

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
    this.$log.log(this.questions);
    
  }
}

export default GameService;
