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
  constructor ($scope, $state, $localStorage, $sessionStorage, AudioPlayerService, ngAudio) {
    'ngInject';

    var audioOn = "volume_up";
    var audioOff = "volume_off";
    var enterFull = "fullscreen";
    var exitFull = "fullscreen_exit";

    var checkPlayMusic = function() {
      if($scope.$storage.audio === audioOn) {
        AudioPlayerService.play($sessionStorage.currentMusic);
      } else {
        AudioPlayerService.stop();
      }
    };

    $scope.$storage = $localStorage.$default({
      audio: audioOn
    });

    checkPlayMusic();

    $scope.fullscreen = enterFull;

    $scope.toggleFullscreen = function() {
      $scope.fullscreen = $scope.fullscreen === enterFull ? exitFull : enterFull;
    }

    $scope.toggleAudio = function() {
      var current = $scope.$storage.audio;
      current = current === audioOn ? audioOff : audioOn;
      $scope.$storage.audio = current;

      checkPlayMusic();
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
