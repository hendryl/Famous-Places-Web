export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('about', {
      templateUrl: 'app/about/about.html',
      controller: 'AboutController',
      controllerAs: 'about'
    })
    .state('select', {
      templateUrl: 'app/select/select.html',
      controller: 'SelectController',
      controllerAs: 'select'
    })
    .state('lobby', {
      templateUrl: 'app/lobby/lobby.html',
      controller: 'LobbyController',
      controllerAs: 'lobby'
    })
    .state('mobile-home', {
      url: '/m',
      templateUrl: 'app/mobile-home/home.html',
      controller: 'HomeController',
      controllerAs: 'home'
    });

  $urlRouterProvider.otherwise('/');
}
