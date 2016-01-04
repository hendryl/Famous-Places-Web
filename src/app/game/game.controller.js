class GameController {
  constructor($log, $scope, $state, $interval, GameService, SocketService, toastr) {
    'ngInject';

    this.$log = $log;
    this.$state = $state;
    this.toastr = toastr;
    this.$interval = $interval;
    this.GameService = GameService;
    this.SocketService = SocketService;

    $scope.$on('server_disconnect', function(event, args) {
      alert('Server disconnected. Game ended.');
      $state.go('home');
    });

    this.SocketService.extendedHandler = (message) => {
      if (message.type === 'player_disconnect') {
        this.handlePlayerDisconnect(message);
      }
    };
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

export default GameController;
