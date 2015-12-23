class ModeFactory {
  constructor($http, baseURLConfig) {
    'ngInject';

    this.$http = $http;
    this.baseURLConfig = baseURLConfig;
  }

  getList() {
    return this.$http.get(this.baseURLConfig.rootAPI + '/modes/');
  }
}

export default ModeFactory;
