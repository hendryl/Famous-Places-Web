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
    });

  $urlRouterProvider.otherwise('/');
}
