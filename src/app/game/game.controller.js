class GameController {
  constructor($log, $scope, $state, $interval, GameService, SocketService, toastr) {
    'ngInject';

    this.$log = $log;
    this.$state = $state;
    this.toastr = toastr;
    this.$interval = $interval;
    this.GameService = GameService;
    this.SocketService = SocketService;

    this.animTime = 1000;
    this.questionHidden = true;
    this.question = GameService.getQuestion();
    this.players = GameService.players;

    this.$log.log(this.question);
    this.$log.log(this.players);

    this.players = [
      {
        name: 'asdf',
        score: 0
      },
      {
        name: 'weqeqrwerqw',
        score: 0
      },
      {
        name: 'adsfdfsasdfasdf',
        score: 0
      },
      {
        name: '12345678901234567890',
        score: 0
      }
    ];

    $scope.$on('server_disconnect', function(event, args) {
      alert('Server disconnected. Game ended.');
      $state.go('home');
    });

    this.SocketService.extendedHandler = (message) => {
      if (message.type === 'player_disconnect') {
        this.handlePlayerDisconnect(message);
      }
    };

    //TODO: create timer

    this.setAnimation();
  }

  setAnimation() {
    this.$interval(() => {
      this.questionHidden = false;
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
