class GameController {
  constructor(_, $window, $localStorage, $log, $scope, $state, $interval, $timeout, GameService, SocketService, ScoreService, toastr, audioOn) {
    'ngInject';

    this._ = _;
    this.$log = $log;
    this.$state = $state;
    this.toastr = toastr;
    this.$window = $window;
    this.$storage = $localStorage;
    this.$interval = $interval;
    this.GameService = GameService;
    this.ScoreService = ScoreService;
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

        this.$log.log('answer received');

        if (_.contains(this.answered, message.player)) {
          this.$log.log('player already answered before');
          return;
        }

        const player = _.find(this.players, (p) => p.id === message.id);
        player.lastAnswer = {
          lat: message.lat,
          long: message.long
        }
        this.answered.push(message.player);
        //TODO: play sound

        if (this.answered.length >= this.players.length) {
          this.SocketService.send({
            type: 'end_round',
            round: this.round
          });
          this.$log.log('end');
          $timeout(() => {
            this.$state.go('score');
          }, 2000);
        }
      }
    };

    this.setAnimation();
    this.playMusic();
  }

  isPlayerDone(index) {
    const id = this.players[index].id;
    return this._.contains(this.answered, id);
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
    }, this.waitTime, 1, true);
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
    return this.ScoreService.padWithZeroes(value);
  }
}

export default GameController;
