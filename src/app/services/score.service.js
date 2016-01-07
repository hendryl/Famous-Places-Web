class ScoreService {
  constructor(_) {
    'ngInject';

    this._ = _;
  }

  calculateScore(distance) {
    
  }

  padWithZeroes(value) {
    return this._.padLeft(value.toString(), 6, '0');
  }
}

export default ScoreService;
