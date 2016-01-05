class GameController {
  constructor(_, $window, $log, $scope, $state, $interval, GameService, SocketService, toastr) {
    'ngInject';

    this._ = _;
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

      } else if (message.type === 'answer') {
        const player = _.find(this.players, (p) => p.id === message.player);
        player.lastAnswer = message.answer;
        //TODO: animate player done
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

  setAnimation() {
    this.$interval(() => {
      this.questionHidden = false;
      angular.element(".gameQuestion").one('transitionend', (event) => {
        //TODO: this.playSound('timerStart');
        this.SocketService.send({
          type: 'start_round'
        });
        this.startTimer();
      });
    }, this.waitTime, 0, true);
  }

  startTimer() {
    this.$interval(() => this.tickTimer(), 1000, this.timer, true);
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
    return this._.padLeft(value.toString(), 6, '0');
  }
}

export default GameController;
