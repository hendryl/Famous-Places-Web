/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';

import NavbarDirective from './components/navbar/navbar.directive';

var lodash = require('lodash');

angular.module('famousPlacesWeb', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'angularScreenfull', 'ui.router', 'ui.bootstrap', 'toastr', 'ngAudio', 'ngStorage', 'btford.socket-io'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .constant('_', lodash)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .controller('MainController', MainController)

  .directive('navbar', () => new NavbarDirective());
