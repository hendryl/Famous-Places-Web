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

    this.animTime = 1000;
    this.questionHidden = true;
    this.question = GameService.getQuestion();
    this.players = GameService.players;

    this.$log.log(this.question);
    this.$log.log(this.players);

    this.players = [
      {
        name: 'panjang nama max',
        score: 0
      },
      {
        name: 'nama gua panjang',
        score: 0
      },
      {
        name: 'm',
        score: 0
      },
      {
        name: '1234567890123456',
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

  isWindowSmall() {
    return this.$window.innerWidth < 800;
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
