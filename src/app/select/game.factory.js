class GameFactory {
  constructor($http, baseURLConfig) {
    'ngInject';

    this.$http = $http;
    this.baseURLConfig = baseURLConfig;
  }

  createGame(mode_id) {
    return this.$http.post(this.baseURLConfig.rootApi + '/games', {mode_id: mode_id});
  }
}

export default GameFactory;
