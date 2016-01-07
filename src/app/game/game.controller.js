class GameController {
  constructor(_, $window, $localStorage, $log, $scope, $state, $interval, GameService, SocketService, toastr, audioOn) {
    'ngInject';

    this._ = _;
    this.$log = $log;
    this.$state = $state;
    this.toastr = toastr;
    this.$window = $window;
    this.$storage = $localStorage;
    this.$interval = $interval;
    this.GameService = GameService;
    this.SocketService = SocketService;

    this.audioOn = audioOn;
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

        const player = _.find(this.players, (p) => p.id === message.id);
        player.lastAnswer = {
          lat: message.lat,
          long: message.long
        }
        this.answered.push(message.player);
        //TODO: play sound

        if (this.answered >= this.players.length) {
          this.SocketService.send({
            type: 'end_round',
            round: this.round
          });
          this.$log.log('end');
          //TODO: this.$state.go('');
        }
      }
    };

    this.setAnimation();
    this.playMusic();
  }

  isPlayerDone(index) {
    const id = this.players[index].id;
    return _.contains(this.answered, id);
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

        this.$log.log('sent start_round message');
      });
    }, this.waitTime, 0, true);
  }

  playMusic() {
    if (this.$storage.audioStatus === this.audioOn) {
      this.GameService.playMusic();
    }
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
