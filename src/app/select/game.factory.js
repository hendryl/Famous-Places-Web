class GameFactory {
  constructor($http, baseURLConfig) {
    'ngInject';

    this.$http = $http;
    this.baseURLConfig = baseURLConfig;
    console.log(baseURLConfig);
  }

  createGame(mode_id) {
    return this.$http.post(this.baseURLConfig.rootAPI + '/games/', {mode_id: mode_id});
  }
}

export default GameFactory;
