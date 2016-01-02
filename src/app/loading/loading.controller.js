class LoadingController {
  constructor($scope, $state) {
    'ngInject';

    $scope.$on('server_disconnect', function(event, args) {
      alert('Server disconnected. Game ended.');
      $state.go('home');
    });
  }
}

export default LoadingController;
