class GameController {
  constructor($window, $log, $scope, $state, $interval, GameService, SocketService, toastr) {
    'ngInject';

    this.$log = $log;
    this.$state = $state;
    this.toastr = toastr;
    this.$window = $window;
    this.$interval = $interval;
    this.GameService = GameService;
    this.SocketService = SocketService;

    this.waitTime = 2000;
    this.questionHidden = true;
    this.question = GameService.getQuestion();
    this.players = GameService.players;
    this.timer = 30;

    $scope.$on('server_disconnect', function(event, args) {
      alert('Server disconnected. Game ended.');
      $state.go('home');
    });

    this.SocketService.extendedHandler = (message) => {
      if (message.type === 'player_disconnect') {
        this.handlePlayerDisconnect(message);
      }
    };

    this.setAnimation();
  }

  isWindowSmall() {
    return this.$window.innerWidth < 800;
  }

  isWarningTime() {
    return this.timer < 10;
  }

  startTimer() {
    this.$interval(() => this.tickTimer(), 1000, this.timer, true);
    //TODO: this.send start timer
  }

  tickTimer() {
    this.timer -= 1;

    if(this.timer === 0) {
      this.endTimer();
    }
  }

  endTimer() {
    this.$log.log("Timer ended");
    //TODO: this.send end timer
  }

  setAnimation() {
    this.$interval(() => {
      this.questionHidden = false;
      $(".gameQuestion").one('transitionend', (event) => {
        //TODO: this.playSound('timerStart');
        this.startTimer();
      });
    }, this.animTime, 0, true);
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

  padWithZeroes(value) {
    return _.padLeft(value.toString(), 6, '0');
  }
}

export default GameController;
