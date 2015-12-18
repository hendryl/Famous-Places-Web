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
  constructor ($scope) {
    'ngInject';

    $scope.fullscreen = false;

    $scope.toggleFullscreen = function() {
      $scope.fullscreen = !$scope.fullscreen;
    }
  }
}

export default NavbarDirective;
