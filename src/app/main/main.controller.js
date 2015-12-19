export class MainController {
  constructor ($scope, $localStorage, $sessionStorage, baseMusic, audioOn, AudioPlayerService) {
    'ngInject';

    $scope.$storage = $localStorage.$default({
      audioStatus: audioOn
    });

    $sessionStorage.currentMusic = baseMusic;

    if(AudioPlayerService.shouldPlayMusic()) {
      AudioPlayerService.play();
    }
  }
}
