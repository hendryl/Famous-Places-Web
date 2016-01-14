class BroadcastService {
  constructor($rootScope) {
    'ngInject';
    this.$rootScope = $rootScope;
  }

  send(message, data) {
    this.$rootScope.$broadcast(message, data);
  }
}

export default BroadcastService;
