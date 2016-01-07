/* global google:false*/
class ScoreController {
  constructor(_, NgMap, toastr, $interval, $state, $window, $scope, $log, AudioService, SocketService, GameService, ScoreService, mapsKey) {
    'ngInject';

    this._ = _;
    this.$log = $log;
    this.toastr = toastr;
    this.$state = $state;
    this.$window = $window;
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
    this.distances = [];
    this.receivedPoints = [];
    this.text = "RESULTS";

    this.mapCenter = {
      lat: 0,
      long: 0
    };

    this.googleMapsURL = "https://maps.google.com/maps/api/js?libraries=places,geometry&callback=prepareMap&key=" + mapsKey;

    $interval(() => {
      this.showMap = true;
      this.text = 'Location: ' + this.question.name + ', ' + this.question.country;
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
        lat: 51.5072,
        long: 0.1275
      }
    });

    this.players.push({
      name: 'xvcxzcvzxcv',
      id: '6545131345',
      score: 0,
      lastAnswer: {
        lat: 52.5167,
        long: 13.3833
      }
    });

    this.players.push({
      name: 'were',
      id: '77777777',
      score: 0,
      lastAnswer: {
        lat: 35.6833,
        long: 139.6833
      }
    });

    this.players.push({
      name: 'po',
      id: '44444566666',
      score: 0,
      lastAnswer: {
        lat: 15.7833,
        long: 47.8667
      }
    });

    this.question = {};
    this.question.lat = 48.8567;
    this.question.long = 2.3508;
  }

  isWindowSmall() {
    return this.$window.innerWidth < 800;
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
    this.fitBounds();
    this.calculateGeodesicDistance();
    this.calculateScore();
    this.subscribeToMapEvents();
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
    const icons = [
      'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
      'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
    ];

    for (let i = 0; i < this.players.length; i++) {
      var marker = new google.maps.Marker();
      var latLng = new google.maps.LatLng(this.players[i].lastAnswer.lat, this.players[i].lastAnswer.long);

      marker.setPosition(latLng);
      marker.setIcon(icons[i]);
      marker.setMap(this.map);
      this.markers.push(marker);
    }
  }

  prepareLines() {
    const colors = [
      '#BF1E2E',
      '#4BB0EE',
      '#008369',
      '#FFA336'
    ];

    const answerLatLng = new google.maps.LatLng(this.question.lat, this.question.long);

    for (let i = 0; i < this.players.length; i++) {
      const latLng = new google.maps.LatLng(this.players[i].lastAnswer.lat, this.players[i].lastAnswer.long);

      const line = new google.maps.Polyline({
        path: [latLng, answerLatLng],
        strokeColor: colors[i],
        strokeOpacity: 1.0,
        strokeWeight: 4,
        map: this.map
      });

      this.lines.push(line);
    }
  }

  fitBounds() {
    const markers = this.markers;
    var bounds = new google.maps.LatLngBounds();

    for(let i = 0; i < markers.length; i++) {
      bounds.extend(markers[i].getPosition());
    }

    this.map.fitBounds(bounds);
  }

  calculateGeodesicDistance() {
    const answerLatLng = new google.maps.LatLng(this.question.lat, this.question.long);

    this.distances = this._.map(this.players, (p) => {
      const latLng = new google.maps.LatLng(p.lastAnswer.lat, p.lastAnswer.long);
      return google.maps.geometry.spherical.computeDistanceBetween(latLng, answerLatLng);
    });
  }

  calculateScore() {
    this.scores = this._.map(this.distances, (dist) => {
      return this.ScoreService.calculateScore(dist);
    })
  }

  subscribeToMapEvents() {
    google.maps.event.addListener(this.map, 'bounds_changed', () => {
      this.fitBounds();
      this.$log.log('asdasdasdasd');
    })
  }

  padWithZeroes(value) {
    return this.ScoreService.padWithZeroes(value);
  }
}

export default ScoreController;
