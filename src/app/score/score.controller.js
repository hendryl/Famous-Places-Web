class ScoreController {
  constructor(_, NgMap, toastr, $interval, $state, $scope, $log, AudioService, SocketService, GameService, ScoreService, mapsKey) {
    'ngInject';

    this._ = _;
    this.$log = $log;
    this.toastr = toastr;
    this.$state = $state;
    this.GameService = GameService;
    this.AudioService = AudioService;
    this.ScoreService = ScoreService;
    this.SocketService = SocketService;

    this.round = GameService.getRound();
    this.question = GameService.getQuestion(this.round);
    this.players = GameService.players;
    this.showMap = false;
    this.map = null;
    this.text = "RESULTS";
    
    this.mapCenter = {
      lat: 0,
      long: 0
    };

    this.googleMapsURL = "https://maps.google.com/maps/api/js?libraries=places&callback=prepareMap&key=" + mapsKey;

    $interval(() => {
      this.showMap = true;
      this.$log.log('ahahahahha');
    }, 2000, 1, true);
    //flow:
    //tunjukkin jawabannya
    //tunjukkin jarak masing2 pemain, sekaligus skor
    //di device para pemain, tunjukkin button continue, disable sebelum semua selesai
    this.players.push({
      name: 'asdf',
      id: '123123213',
      score: 0,
      lastAnswer: {
        lat: 0,
        long: 0
      }
    });

    this.players.push({
      name: 'xvcxzcvzxcv',
      id: '6545131345',
      score: 0,
      lastAnswer: {
        lat: -6,
        long: 100
      }
    });

    this.players.push({
      name: 'were',
      id: '77777777',
      score: 0,
      lastAnswer: {
        lat: 20,
        long: -100
      }
    });

    this.players.push({
      name: 'po',
      id: '44444566666',
      score: 0,
      lastAnswer: {
        lat: 30,
        long: 72
      }
    });
  }

  prepareMap(map) {
    this.$log.log(this);
    this.map = map;

    const options = {
      streetViewControl: false,
      mapTypeControl: false,
      zoomTypeControl: false
    };

    map.setOptions(options);
  }

  padWithZeroes(value) {
    return this.ScoreService.padWithZeroes(value);
  }
}

export default ScoreController;
