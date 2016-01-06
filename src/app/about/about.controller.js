const credits = [{
  "image": "assets/images/angular.png",
  "title": "AngularJS",
  "url": "https://angularjs.org/"
}, {
  "image": "assets/images/babel.png",
  "title": "Babel",
  "url": "https://babeljs.io/"
}, {
  "image": "assets/images/bootstrap.png",
  "title": "Bootstrap",
  "url": "http://getbootstrap.com/"
}, {
  "image": "assets/images/gulp.png",
  "title": "GulpJS",
  "url": "http://gulpjs.com/"
}, {
  "image": "assets/images/node-sass.png",
  "title": "Sass Node version",
  "url": "http://sass-lang.com/"
}, {
  "image": "assets/images/yeoman.png",
  "title": "Yeoman",
  "url": "http://yeoman.io/"
}, {
  "image": "assets/images/nodejs.png",
  "title": "NodeJS",
  "url": "https://nodejs.org/en/"
}, {
  "image": "assets/images/expressjs.png",
  "title": "ExpressJS",
  "url": "http://expressjs.com/en/index.html"
}, {
  "image": "assets/images/sockjs.png",
  "title": "SockJS",
  "url": "https://github.com/sockjs"
}, {
  "image": "assets/images/PostgreSQL.png",
  "title": "PostgreSQL",
  "url": "http://www.postgresql.org/"
}, {
  "image": "assets/images/heroku.png",
  "title": "Heroku",
  "url": "https://www.heroku.com"
}, {
  "image": "assets/images/bitballoon.png",
  "title": "BitBalloon",
  "url": "https://www.bitballoon.com"
}];

class AboutController {
  constructor(_, $localStorage, AudioService, audioOn, lobbyMusic) {
    'ngInject';

    this.credits = _.sortBy(credits, (n) => {
      return n.title;
    });

    if ($localStorage.audioStatus === audioOn) {
      const music = AudioService.prepareMusic(lobbyMusic);
      AudioService.setMusic(music);
      AudioService.playMusic();
    }
  }
}

export default AboutController;
