class SocketService {
  constructor($log, SockJS, baseURLConfig, BroadcastService) {
    'ngInject';

    this.$log = $log;
    this.SockJS = SockJS;
    this.baseURLConfig = baseURLConfig;
    this.BroadcastService = BroadcastService;

    this.socket = null;
    this.connected = false;
    this.extendedHandler = null;
  }

  isConnected() {
    return this.connected;
  }

  connect() {
    return new Promise( (resolve, reject) => {
      this.$log.debug('connecting to sockjs');
      this.socket = new this.SockJS(this.baseURLConfig.rootAPI + '/sockets');
      this.socket.onopen = () => {
        this.connected = true;
        resolve(this.connected);
      };

      this.socket.onclose = () => {
        this.connected = false;
        this.$log.debug('connection closed');
        this.BroadcastService.send('server_disconnect', null);
      };

      this.socket.onmessage = ((message) => {
        this.handleMessage(message);
      });
    });
  }

  handleMessage(message) {
    this.$log.debug('message received');

    message = angular.fromJson(message.data);

    if(message.type === 'error') {
      this.$log.error(message.reason);

    } else if(message.type === 'create_room') {
      this.$log.debug('create room success');

    } else if(message.type === 'join_room') {
      this.$log.debug('player joined');
    }

    if(this.extendedHandler != null) {
      this.extendedHandler(message);
    }
  }

  createRoom(game_id, name) {
    this.$log.debug('creating room');
    this.send({
      type: 'create_room',
      game_id: game_id,
      name: name
    });
  }

  deleteRoom() {
    this.$log.debug('deleting room');
    this.send({
      type: 'delete_room'
    });
  }

  send(obj) {
    obj.role = 'owner';
    var json = angular.toJson(obj, true);
    this.socket.send(json);
  }

  disconnect() {
    this.socket.close();
    this.socket = null;
  }
}

export default SocketService;
