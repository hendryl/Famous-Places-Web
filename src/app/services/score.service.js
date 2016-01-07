class ScoreService {
  constructor(_) {
    'ngInject';

    this._ = _;
    this.maxScore = 1000;
  }

  calculateScore(distance) {
    let result = 0;

    if(distance < 0 || distance >= 10000000) {
      result = 0;

    } else if(distance <= 10) {
      result = this.maxScore;

    } else if(distance <= 10000) {
      result = this.maxScore - this.reduceSmall(distance);

    } else if(distance <= 1000000) {
      result = this.maxScore - this.reduceMedium(distance);

    } else { // 1,000,001 - ???
      result = this.maxScore - this.reduceLarge(distance);
    }

    result = result < 0 ? 0 : result;
    return Math.round(result);
  }

  reduceSmall(distance) {
    return 14.476 * Math.log(distance) - 33.333;
  }

  reduceMedium(distance) {
    return 86.859 * Math.log(distance) - 700;
  }

  reduceLarge(distance) {
    return 217.15 * Math.log(distance) - 2500;
  }

  padWithZeroes(value) {
    return this._.padLeft(value.toString(), 6, '0');
  }
}

export default ScoreService;
