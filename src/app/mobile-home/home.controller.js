class HomeController {
  constructor($log, socket) {
    'ngInject';

    socket.onopen = () => {
      socket.opened = true;
    }
  }

  play() {
    
  }
}

export default HomeController;
