class GameController {
  constructor($log, $scope, $state, $interval, GameService, SocketService) {
    'ngInject';

    this.$log = $log;
    this.$state = $state;
    this.$interval = $interval;
    this.GameService = GameService;
    this.SocketService = SocketService;

    $scope.$on('server_disconnect', function(event, args) {
      alert('Server disconnected. Game ended.');
      $state.go('home');
    });
  }
}

export default GameController;
