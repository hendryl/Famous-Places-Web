class MainController {
  constructor ($scope, $state, $localStorage, $sessionStorage, baseMusic, audioOn, AudioPlayerService) {
    'ngInject';

    $scope.$storage = $localStorage.$default({
      audioStatus: audioOn
    });

    $sessionStorage.currentMusic = baseMusic;

    if(AudioPlayerService.shouldPlayMusic()) {
      AudioPlayerService.play();
    }

    $scope.play = function() {
      $state.go('select');
    };
  }
}

export default MainController;
