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

    var audioOn = "volume_up";
    var audioOff = "volume_off";
    var enterFull = "fullscreen";
    var exitFull = "fullscreen_exit";

    $scope.fullscreen = enterFull;
    $scope.audio = audioOn;

    $scope.toggleFullscreen = function() {
      $scope.fullscreen = $scope.fullscreen === enterFull ? exitFull : enterFull;
    }

    $scope.toggleAudio = function() {
      $scope.audio = $scope.audio === audioOn ? audioOff : audioOn;
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
