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
    this.round = GameService.getRound();
    this.question = GameService.getQuestion(this.round);
    this.players = GameService.players;
    this.answered = [];

    $scope.$on('server_disconnect', function(event, args) {
      alert('Server disconnected. Game ended.');
      $state.go('home');
    });

    this.SocketService.extendedHandler = (message) => {
      if (message.type === 'player_disconnect') {
        this.handlePlayerDisconnect(message);

      } else if (message.type === 'answer') {
        if (_.contains(this.answered, message.player)) {
          return;
        }

        const player = _.find(this.players, (p) => p.id === message.player);
        player.lastAnswer = message.answer;
        this.answered.push(message.player);
        //TODO: animate player done

        if (this.answered >= this.players.length) {
          this.SocketService.send({
            type: 'end_round',
            round: this.round
          });

          //TODO: this.$state.go('');
        }
      }
    };

    this.setAnimation();
  }

  isWindowSmall() {
    return this.$window.innerWidth < 800;
  }

  setAnimation() {
    this.$interval(() => {
      this.questionHidden = false;
      angular.element(".gameQuestion").one('transitionend', (event) => {
        //TODO: this.playSound('timerStart');
        this.SocketService.send({
          type: 'start_round',
          round: this.round
        });
      });
    }, this.waitTime, 0, true);
  }

  handlePlayerDisconnect(message) {
    const toastrMessage = this.GameService.handlePlayerDisconnect(message);

    //no more players!
    if (this.GameService.players.length === 0) {
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
