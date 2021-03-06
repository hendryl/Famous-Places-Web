/* global malarkey:false, moment:false, Howl, Howler:false, SockJS:false*/

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import MainController from './main/main.controller';
import AboutController from './about/about.controller';
import SelectController from './select/select.controller';
import LobbyController from './lobby/lobby.controller';
import LoadingController from './loading/loading.controller';
import GameController from './game/game.controller';
import ScoreController from './score/score.controller';
import ResultController from './result/result.controller';

import NavbarDirective from './components/navbar/navbar.directive';

import AudioService from './services/audio.service';
import GameService from './services/game.service';
import SocketService from './services/socket.service';
import BroadcastService from './services/broadcast.service';
import ScoreService from './services/score.service';

import ModeFactory from './factories/mode.factory.js';
import GameFactory from './factories/game.factory.js';
import ImageFactory from './factories/image.factory.js';

import baseURLConfig from './api.js';

var lodash = require('lodash');

angular.module('famousPlacesWeb', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'angularScreenfull', 'ui.router', 'ui.bootstrap', 'toastr', 'ngStorage', 'ngMap'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .constant('_', lodash)
  .constant('Howl', Howl)
  .constant('Howler', Howler)
  .constant('SockJS', SockJS)
  .constant('mapsKey', 'AIzaSyBKm4xvXU4kg3MOvyghsWeNO1BtcHzvBQA')

  //global strings
  .constant('baseURLConfig', baseURLConfig)
  .constant('baseMusic', "https://dl.dropboxusercontent.com/u/13188176/Famous%20Places/Music/Fingerpoppin%27%27.mp3")
  .constant('lobbyMusic', 'https://dl.dropboxusercontent.com/u/13188176/Famous%20Places/Music/bensound-theelevatorbossanova.mp3')
  .constant('audioOn', 'volume_up')
  .constant('audioOff', 'volume_off')

  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .controller('MainController', MainController)
  .controller('AboutController', AboutController)
  .controller('SelectController', SelectController)
  .controller('LobbyController', LobbyController)
  .controller('LoadingController', LoadingController)
  .controller('GameController', GameController)
  .controller('ScoreController', ScoreController)
  .controller('ResultController', ResultController)

  .directive('navbar', () => new NavbarDirective())

  .service('AudioService', AudioService)
  .service('GameService', GameService)
  .service('ScoreService', ScoreService)
  .service('SocketService', SocketService)
  .service('BroadcastService', BroadcastService)

  .factory('ModeFactory', ($http, baseURLConfig) => new ModeFactory($http, baseURLConfig))
  .factory('GameFactory', ($http, baseURLConfig) => new GameFactory($http, baseURLConfig))
  .factory('ImageFactory', ($http, baseURLConfig) => new ImageFactory($http, baseURLConfig));
