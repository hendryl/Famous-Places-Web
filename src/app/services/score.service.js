class ScoreService {
  constructor(_) {
    'ngInject';

    this._ = _;
    this.maxScore = 1000;
  }

  calculateScore(distance) {
    if(distance < 0 || distance > 999999) {
      return 0;
    } else if(distance < 10) {
      return this.maxScore;
    } else if(distance < 10000) {
      return 100;
      //TODO: perform cool logarithms
    } else { // 10001 - 999999
      return 50;
      //TODO: perform cool logarithm 2
    }
  }

  padWithZeroes(value) {
    return this._.padLeft(value.toString(), 6, '0');
  }
}

export default ScoreService;
