/* global google:false*/
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
    this.answerMarker = null;
    this.markers = [];
    this.lines = [];
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

    this.question = {};
    this.question.lat = 70;
    this.question.long = 120;
  }

  prepareMap(map) {
    this.map = map;

    const options = {
      streetViewControl: false,
      mapTypeControl: false,
      zoomControl: false
    };

    map.setOptions(options);
    this.preparePlayerMarkers();
    this.prepareAnswerMarker();
    this.prepareLines();
  }

  prepareAnswerMarker() {
    const answerIcon = 'http://maps.google.com/mapfiles/kml/pal2/icon13.png';
    const answerLatLng = new google.maps.LatLng(this.question.lat, this.question.long);

    this.answerMarker = new google.maps.Marker();
    this.answerMarker.setPosition(answerLatLng);
    this.answerMarker.setIcon(answerIcon);
    this.answerMarker.setMap(this.map);
  }

  preparePlayerMarkers() {
    const redIcon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
    const blueIcon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
    const greenIcon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
    const yellowIcon = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';

    for (let i = 0; i < this.players.length; i++) {
      var marker = new google.maps.Marker();
      var latLng = new google.maps.LatLng(this.players[i].lastAnswer.lat, this.players[i].lastAnswer.long);
      marker.setPosition(latLng);

      var icon = redIcon;
      switch (i) {
        case 0:
          icon = redIcon;
          break;
        case 1:
          icon = blueIcon;
          break;
        case 2:
          icon = greenIcon;
          break;
        case 3:
          icon = yellowIcon;
          break;
        default:
          icon = redIcon;
      }

      marker.setIcon(icon);
      marker.setMap(this.map);
      this.markers.push(marker);
    }
  }

  prepareLines() {

    for (let i = 0; i < this.players.length; i++) {
      let latLngA = new google.maps.LatLng(this.players[i].lastAnswer.lat, this.players[i].lastAnswer.long);
      let latLngB = new google.maps.LatLng(this.question.lat, this.question.lng);

      let line = new google.maps.Polyline({
        path: [latLngA, latLngB],
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 4,
        map: this.map
      });

      this.lines.push(line);
    }

    google.maps.event.trigger(this.map,'resize');
  }

  padWithZeroes(value) {
    return this.ScoreService.padWithZeroes(value);
  }
}

export default ScoreController;
