/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { AboutController } from './about/about.controller';

import NavbarDirective from './components/navbar/navbar.directive';

import AudioPlayerService from './components/audioplayer/player.service';

var lodash = require('lodash');

angular.module('famousPlacesWeb', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'angularScreenfull', 'ui.router', 'ui.bootstrap', 'toastr', 'ngAudio', 'ngStorage', 'btford.socket-io'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .constant('_', lodash)

  .constant('baseMusic', "https://dl.dropboxusercontent.com/u/13188176/Famous%20Places/Music/bensound-thejazzpiano.mp3")

  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .controller('MainController', MainController)
  .controller('AboutController', AboutController)

  .directive('navbar', () => new NavbarDirective())

  .service('AudioPlayerService',AudioPlayerService);
