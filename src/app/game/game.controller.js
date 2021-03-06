class GameController {
  constructor(_, $window, $localStorage, $log, $scope, $state, $interval, $timeout, GameService, SocketService, ScoreService, AudioService, toastr, audioOn) {
    'ngInject';

    this._ = _;
    this.$log = $log;
    this.$state = $state;
    this.toastr = toastr;
    this.$window = $window;
    this.$storage = $localStorage;
    this.$timeout = $timeout;
    this.$interval = $interval;
    this.GameService = GameService;
    this.ScoreService = ScoreService;
    this.SocketService = SocketService;
    this.AudioService = AudioService;

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

        this.$log.debug('answer received');

        if (_.contains(this.answered, message.player)) {
          this.$log.debug('player already answered before');
          return;
        }

        const player = _.find(this.players, (p) => p.id === message.player);
        player.lastAnswer = {
          lat: message.lat,
          long: message.long
        }

        this.answered.push(message.player);

        this.$timeout( () => {
          this.AudioService.playSound('blub');
        }, 500);

        if (this.answered.length >= this.players.length) {
          this.SocketService.send({
            type: 'end_round',
            round: this.round
          });

          this.$log.debug('end');

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
    this.$timeout(() => {
      this.questionHidden = false;
      angular.element(".gameQuestion").one('transitionend', (event) => {
        this.AudioService.playSound('ping');
        this.SocketService.send({
          type: 'start_round',
          round: this.round
        });

        this.$log.debug('sent start_round message');
      });
    }, this.waitTime);
  }

  playMusic() {
    this.$timeout( () => {
      this.GameService.playMusic();
    }, 1000);
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
