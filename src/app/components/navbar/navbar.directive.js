class NavbarDirective {
  constructor () {
    'ngInject';

    return {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      controller: NavbarController,
      bindToController: true
    };
  }
}

class NavbarController {
  constructor ($scope, $state) {
    'ngInject';

    $scope.fullscreen = false;

    $scope.toggleFullscreen = function() {
      $scope.fullscreen = !$scope.fullscreen;
    }

    $scope.handleAbout = function() {
      if($state.is('home')) {
        $state.go('about');
      } else {
        $state.go('home');
      }
    };
  }
}

export default NavbarDirective;
