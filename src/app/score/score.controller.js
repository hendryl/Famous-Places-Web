class ScoreController {
  constructor(_, NgMap, toastr, $state, $scope, $log, AudioService, SocketService, GameService) {
    'ngInject';

    this._ = _;
    this.$log = $log;
    this.toastr = toastr;
    this.$state = $state;
    this.GameService = GameService;
    this.AudioService = AudioService;
    this.SocketService = SocketService;

    this.round = GameService.getRound();
    this.question = GameService.getQuestion(this.round);
    this.players = GameService.players;

  padWithZeroes(value) {
    return this._.padLeft(value.toString(), 6, '0');
  }
}

export default ScoreController;
