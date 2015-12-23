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
  constructor ($scope, $state, $localStorage, AudioPlayerService, audioOn, audioOff) {
    'ngInject';

    var enterFull = "fullscreen";
    var exitFull = "fullscreen_exit";

    $scope.fullscreen = enterFull;
    $scope.$storage = $localStorage;

    $scope.toggleFullscreen = function() {
      $scope.fullscreen = $scope.fullscreen === enterFull ? exitFull : enterFull;
    };

    $scope.toggleAudio = function() {
      var current = $scope.$storage.audioStatus;
      current = current === audioOn ? audioOff : audioOn;
      $scope.$storage.audioStatus = current;

      AudioPlayerService.playPause();
    };

    $scope.shouldHideAboutButton = function() {
      if($state.is('home') || $state.is('about')) {
        return false;
      }

      return true;
    };

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
