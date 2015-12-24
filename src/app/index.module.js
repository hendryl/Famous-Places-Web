/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import MainController from './main/main.controller';
import AboutController from './about/about.controller';
import SelectController from './select/select.controller';

import NavbarDirective from './components/navbar/navbar.directive';

import AudioPlayerService from './components/audioplayer/player.service';

import ModeFactory from './select/mode.factory.js';

var lodash = require('lodash');

angular.module('famousPlacesWeb', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'angularScreenfull', 'ui.router', 'ui.bootstrap', 'toastr', 'ngAudio', 'ngStorage', 'btford.socket-io'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .constant('_', lodash)
  .constant('baseURLConfig', {
    'rootAPI': 'https://famous-places-api.herokuapp.com/api'
  })

  .constant('baseMusic', "https://dl.dropboxusercontent.com/u/13188176/Famous%20Places/Music/bensound-thejazzpiano.mp3")
  .constant('audioOn', 'volume_up')
  .constant('audioOff', 'volume_off')

  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .controller('MainController', MainController)
  .controller('AboutController', AboutController)
  .controller('SelectController', SelectController)

  .directive('navbar', () => new NavbarDirective())

  .service('AudioPlayerService', AudioPlayerService)

  .factory('ModeFactory', ($http, baseURLConfig) => new ModeFactory($http, baseURLConfig));
