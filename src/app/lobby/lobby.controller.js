class LobbyController {
  constructor($location, GameService) {
    'ngInject';

    this.game_id = GameService.game_id;
    this.password = GameService.roomName;
    this.GameService = GameService;

    this.mobileAddress = $location.host() +'/m';
  }
}

export default LobbyController;
