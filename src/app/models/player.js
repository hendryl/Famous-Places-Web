class Player {
  constructor(id, number, name, score) {
    'ngInject';

    this.socketId = id;
    this.number = number;
    this.name = name;
    this.score = score;
    this.lastAnswer = null;
  }
}

export default Player;
