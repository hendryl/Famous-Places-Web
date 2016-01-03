class LoadingController {
  constructor($log, $scope, $state, $interval) {
    'ngInject';

    this.$log = $log;
    this.waitTime = 5000;
    this.ellipsis = '.';

    $scope.$on('server_disconnect', function(event, args) {
      alert('Server disconnected. Game ended.');
      $state.go('home');
    });

    $interval(() => this.changeEllipsis(), 850, 0, true);
  }

  changeEllipsis() {
    this.$log.log('change');
    this.ellipsis += '.';

    if (this.ellipsis.length > 3) {
      this.ellipsis = '.';
    }
  }
}

export default LoadingController;
