class SocketService {
  constructor($log, SockJS, baseURLConfig) {
    'ngInject';

    this.$log = $log;
    this.SockJS = SockJS;
    this.baseURLConfig = baseURLConfig;

    this.socket = null;
    this.connected = false;
  }

  connect() {
    return new Promise( (resolve, reject) => {
      this.$log.log('connecting to sockjs');
      this.socket = new this.SockJS(this.baseURLConfig.localAPI + '/sockets');
      this.socket.onopen = () => {
        this.connected = true;
        resolve(this.connected);
      };

      this.socket.onclose = () => {
        this.connected = false;
        this.$log.log('connection closed');
      };
    });
  }

  close() {
    this.socket.close();
    this.socket = null;
  }
}

export default SocketService;
