class LoadingController {
  constructor($log, $scope, $state, $interval, SocketService, GameService) {
    'ngInject';

    this.$log = $log;
    this.$interval = $interval;
    this.GameService = GameService;
    this.SocketService = SocketService;

    this.waitTime = 5000;
    this.animTime = 850;
    this.ellipsis = '.';

    $scope.$on('server_disconnect', function(event, args) {
      alert('Server disconnected. Game ended.');
      $state.go('home');
    });

    this.setAnimation();
    this.setGameAssetChecker(this.waitTime);
  }

  setAnimation() {
    this.$interval(() => this.changeEllipsis(), this.animTime, 0, true);
  }

  setGameAssetChecker(waitTime) {
    this.$interval(() => this.checkAssets(), waitTime, 1, true);
  }

  changeEllipsis() {
    this.ellipsis += '.';

    if (this.ellipsis.length > 3) {
      this.ellipsis = '.';
    }
  }
}

export default LoadingController;
