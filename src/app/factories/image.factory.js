class ImageFactory {
  constructor($http, baseURLConfig) {
    'ngInject';

    this.$http = $http;
    this.baseURLConfig = baseURLConfig;
  }

  getImage(id) {
    return this.$http.get(this.baseURLConfig.rootAPI + '/flickr/photos/' + id + '?type=web&sizing=b');
  }
}

export default ImageFactory;
