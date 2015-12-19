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
  constructor ($scope, $state, $localStorage) {
    'ngInject';

    var audioOn = "volume_up";
    var audioOff = "volume_off";
    var enterFull = "fullscreen";
    var exitFull = "fullscreen_exit";

    $scope.$storage = $localStorage.$default({
      audio: audioOn
    });

    $scope.fullscreen = enterFull;

    $scope.toggleFullscreen = function() {
      $scope.fullscreen = $scope.fullscreen === enterFull ? exitFull : enterFull;
    }

    $scope.toggleAudio = function() {
      $scope.$storage.audio = $scope.$storage.audio === audioOn ? audioOff : audioOn;
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
