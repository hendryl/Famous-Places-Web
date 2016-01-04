class LoadingController {
  constructor($log, $scope, $state, $interval, SocketService, GameService, AudioService) {
    'ngInject';

    this.$log = $log;
    this.$state = $state;
    this.$interval = $interval;
    this.GameService = GameService;
    this.SocketService = SocketService;

    this.waitTime = 5000;
    this.animTime = 850;
    this.ellipsis = '.';
    this.text = 'Game is loading assets'

    $scope.$on('server_disconnect', function(event, args) {
      alert('Server disconnected. Game ended.');
      $state.go('home');
    });

    AudioService.fadeToStop();
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

  checkAssets() {
    if (this.GameService.isGameReady()) {
      this.$log.log('Game ready');
      this.$state.go('game');
      this.SocketService.send({
        type: 'game_ready',
        role: 'owner'
      });
    } else {
      this.$log.log('Game not ready yet');

      if(!this.GameService.ready.images) {
        this.text = 'Game is loading images';
      } else if (!this.GameService.ready.music) {
        this.text = 'Game is loading music';
      }

      this.setGameAssetChecker(1000);
    }
  }
}

export default LoadingController;
