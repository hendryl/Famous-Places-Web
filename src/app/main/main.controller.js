export class MainController {
  constructor ($sessionStorage, baseMusic) {
    'ngInject';

    $sessionStorage.currentMusic = baseMusic;
  }
}
