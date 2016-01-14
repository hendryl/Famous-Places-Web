/* global google:false*/
class ScoreController {
  constructor(_, NgMap, toastr, $interval, $state, $window, $timeout, $scope, $log, AudioService, SocketService, GameService, ScoreService, mapsKey) {
    'ngInject';

    this._ = _;
    this.$log = $log;
    this.toastr = toastr;
    this.$state = $state;
    this.$window = $window;
    this.$timeout = $timeout;
    this.$interval = $interval;
    this.GameService = GameService;
    this.AudioService = AudioService;
    this.ScoreService = ScoreService;
    this.SocketService = SocketService;

    this.round = GameService.getRound();
    this.question = GameService.getQuestion(this.round);
    this.answerLatLng = null;
    this.players = GameService.players;
    this.showMap = false;
    this.map = null;
    this.markers = [];
    this.lines = [];
    this.distances = [];
    this.receivedPoints = [];
    this.pointsRevealed = [false, false, false, false];
    this.text = "RESULTS";

    this.mapCenter = {
      lat: 0,
      long: 0
    };

    this.googleMapsURL = "https://maps.google.com/maps/api/js?libraries=places,geometry&callback=prepareMap&key=" + mapsKey;

    $scope.$on('server_disconnect', function(event, args) {
      alert('Server disconnected. Game ended.');
      $state.go('home');
    });

    this.SocketService.extendedHandler = (message) => this.handleSocketMessage(message);

    this.$log.debug(this.question);
    this.$log.debug('finish constructor');
  }

  handleSocketMessage(message) {
    if (message.type === 'player_disconnect') {
      this.handlePlayerDisconnect(message);

    } else if (message.type === 'continue') {
      this.clearMap();

      if (this.GameService.canMoveToNextQuestion()) {
        this.GameService.moveToNextQuestion();
        this.$state.go('game');

      } else {
        this.$state.go('result');
      }
    }
  }

  prepareMap(map) {
    this.map = map;

    const options = {
      streetViewControl: false,
      mapTypeControl: false,
      zoomControl: false,
      maxZoom: 12
    };

    map.setOptions(options);

    this.$log.debug(map);
    this.drawMapObjects();
    this.subscribeToMapEvents();
    this.startScoring();
  }

  drawMapObjects() {
    this.$log.debug('drawing map objects');

    this.prepareAnswerMarker();
    this.preparePlayerMarkers();

    this.$log.debug('markers created');
    this.$log.debug(this.markers);

    this.prepareLines();
    this.setCenterToAnswer();
    this.fitBounds();
    this.$log.debug('finished drawing map objects');
  }

  prepareAnswerMarker() {
    const answerIcon = 'http://maps.google.com/mapfiles/kml/pal2/icon13.png';
    this.answerLatLng = new google.maps.LatLng(this.question.latitude, this.question.longitude);

    const marker = new google.maps.Marker();
    marker.setPosition(this.answerLatLng);

    marker.setIcon(answerIcon);
    marker.setMap(this.map);
    this.markers.push(marker);
  }

  preparePlayerMarkers() {
    const icons = [
      'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
      'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
    ];

    for (let i = 0; i < this.players.length; i++) {
      const marker = new google.maps.Marker();
      const latLng = new google.maps.LatLng(this.players[i].lastAnswer.lat, this.players[i].lastAnswer.long);

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

    for (let i = 0; i < this.players.length; i++) {
      const latLng = new google.maps.LatLng(this.players[i].lastAnswer.lat, this.players[i].lastAnswer.long);

      const line = new google.maps.Polyline({
        path: [latLng, this.answerLatLng],
        strokeColor: colors[i],
        strokeOpacity: 1.0,
        strokeWeight: 4,
        map: this.map
      });

      this.lines.push(line);
    }
  }

  setCenterToAnswer() {
    this.map.setCenter(this.markers[0].getPosition());
    this.map.setZoom(12);
  }

  fitBounds() {
    let bounds = new google.maps.LatLngBounds();

    this._.each(this.markers, (m) => {
      bounds.extend(m.getPosition());
    });

    this.map.fitBounds(bounds);
  }

  subscribeToMapEvents() {
    this.$log.debug('subscribing to map events');

    this.$log.debug(google.maps.event);
  }

  clearMap() {
    this._.each(this.markers, (m) => m.setMap(null));
    this._.each(this.lines, (l) => l.setMap(null));

    this.markers = [];
    this.lines = [];
    this.map = null;
  }

  startScoring() {

    this.$log.debug('start scoring');

    this.$timeout(() => {
      this.AudioService.playSound('flip');

      this.showMap = true;
      this.text = 'Location: ' + this.question.name + ', ' + this.question.country;

      this.$log.debug('set the text into answer location');

      google.maps.event.trigger(this.map, 'resize');
      this.calculateGeodesicDistance();
      this.calculateScore();
      this.$log.debug(this.receivedPoints);
      this.revealScores();
    }, 2000);
  }

  calculateGeodesicDistance() {
    this.$log.debug('calculating distance');

    this.distances = this._.map(this.players, (p) => {
      const latLng = new google.maps.LatLng(p.lastAnswer.lat, p.lastAnswer.long);
      return google.maps.geometry.spherical.computeDistanceBetween(latLng, this.answerLatLng);
    });
  }

  calculateScore() {
    this.$log.debug('calculating score');
    this.receivedPoints = this._.map(this.distances, (dist) => {
      return this.ScoreService.calculateScore(dist);
    });
  }

  revealScores() {
    this.$log.debug('revealing score');

    let index = 0;
    this.$interval(() => {
      this.AudioService.playSound('blub');
      this.pointsRevealed[index] = true;
      this.$log.debug('revealed point for player ' + index + 1);
      index += 1;

      if (index >= this.players.length) {
        this.$timeout(() => {
          this.addScores();
        }, 800);
      }
    }, 800, this.players.length, true);
  }

  addScores() {
    this.$log.debug('adding score');
    let isAllZero = (arr) => {
      const notZeroArray = arr.filter((value) => value !== 0);
      return notZeroArray.length === 0;
    }

    this.$log.debug('starting ticker');
    for (let i = 0; i < this.players.length; i++) {

      let interval = this.$interval(() => {

        if (this.receivedPoints[i] > 0) {

          if(this.receivedPoints[i] >= 7) {
            this.players[i].score += 7;
            this.receivedPoints[i] -= 7;

          } else {
            this.players[i].score += this.receivedPoints[i];
            this.receivedPoints[i] = 0;
          }

          this.AudioService.playSound('tick');
        } else {
          this.$interval.cancel(interval);
        }

        if (isAllZero(this.receivedPoints)) {
          this.pointsRevealed = this._.map(this.pointsRevealed, (n) => false);

          const stillHaveQuestion = this.GameService.canMoveToNextQuestion();

          this.SocketService.send({
            type: 'end_score',
            haveNextRound: stillHaveQuestion
          });
        }
      }, 30, this.receivedPoints[i], true);
    }
  }

  handlePlayerDisconnect(message) {
    const toastrMessage = this.GameService.handlePlayerDisconnect(message);

    //no more players!
    if (this.GameService.players.length === 0) {
      alert('Last player has disconnected. Ending game.');
      this.$state.go('home');
      this.SocketService.deleteRoom();
    } else {
      this.toastr.warning(toastrMessage);
    }
  }

  padWithZeroes(value) {
    return this.ScoreService.padWithZeroes(value);
  }

  isWindowSmall() {
    return this.$window.innerWidth < 800;
  }
}

export default ScoreController;
