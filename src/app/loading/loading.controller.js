class LoadingController {
  constructor($log, $scope, $state, $interval, $timeout, SocketService, GameService, AudioService, toastr) {
    'ngInject';

    this.$log = $log;
    this.$state = $state;
    this.toastr = toastr;
    this.$interval = $interval;
    this.$timeout = $timeout;
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

    this.SocketService.extendedHandler = (message) => {
      if (message.type === 'player_disconnect') {
        this.handlePlayerDisconnect(message);
      }
    };
  }

  setAnimation() {
    this.$interval(() => this.changeEllipsis(), this.animTime, 0, true);
  }

  setGameAssetChecker(waitTime) {
    this.$timeout(() => this.checkAssets(), waitTime);
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
        type: 'game_ready'
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

  handlePlayerDisconnect(message) {
    const toastrMessage = this.GameService.handlePlayerDisconnect(message);

    //no more players!
    if(this.GameService.players.length === 0) {
      alert('Last player has disconnected. Ending game.');
      this.$state.go('home');
      this.SocketService.deleteRoom();
    } else {
      this.toastr.warning(toastrMessage);
    }
  }
}

export default LoadingController;
