/* global malarkey:false, moment:false, Howl, Howler:false*/

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import MainController from './main/main.controller';
import AboutController from './about/about.controller';
import SelectController from './select/select.controller';
import LobbyController from './lobby/lobby.controller';

import NavbarDirective from './components/navbar/navbar.directive';

import AudioService from './services/audio.service';
import GameService from './services/game.service';

import ModeFactory from './factories/mode.factory.js';
import GameFactory from './factories/game.factory.js';
import ImageFactory from './factories/image.factory.js';

import baseURLConfig from './api.js';

var lodash = require('lodash');
var io = require('socket.io-client')(baseURLConfig.rootAPI, {
  'reconnect': true,
  'reconnection delay': 500
});

angular.module('famousPlacesWeb', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'angularScreenfull', 'ui.router', 'ui.bootstrap', 'toastr', 'ngStorage', 'btford.socket-io'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .constant('_', lodash)
  .constant('Howl', Howl)
  .constant('Howler', Howler)
  .constant('baseURLConfig', baseURLConfig)

  .constant('baseMusic', "https://dl.dropboxusercontent.com/u/13188176/Famous%20Places/Music/bensound-thejazzpiano.mp3")
  .constant('audioOn', 'volume_up')
  .constant('audioOff', 'volume_off')

  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .controller('MainController', MainController)
  .controller('AboutController', AboutController)
  .controller('SelectController', SelectController)
  .controller('LobbyController', LobbyController)

  .directive('navbar', () => new NavbarDirective())

  .service('AudioService', AudioService)
  .service('GameService', GameService)

  .factory('ModeFactory', ($http, baseURLConfig) => new ModeFactory($http, baseURLConfig))
  .factory('GameFactory', ($http, baseURLConfig) => new GameFactory($http, baseURLConfig))
  .factory('ImageFactory', ($http, baseURLConfig) => new ImageFactory($http, baseURLConfig))
  .factory('SocketFactory', (socketFactory) => socketFactory({
    ioSocket: io
  }));
