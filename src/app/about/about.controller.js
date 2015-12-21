const credits = [{
  "image": "assets/images/angular.png",
  "title": "AngularJS - Javascript framework",
  "url": "https://angularjs.org/"
}, {
  "image": "assets/images/babel.png",
  "title": "Babel - Javascript transpiler",
  "url": "https://babeljs.io/"
}, {
  "image": "assets/images/bootstrap.png",
  "title": "Bootstrap - CSS framework",
  "url": "http://getbootstrap.com/"
}, {
  "image": "assets/images/gulp.png",
  "title": "GulpJS - Javascript build system",
  "url": "http://gulpjs.com/"
}, {
  "image": "assets/images/node-sass.png",
  "title": "Sass Node version - CSS preprocessor",
  "url": "http://sass-lang.com/"
}, {
  "image": "assets/images/yeoman.png",
  "title": "Yeoman - Webapp scaffolder",
  "url": "http://yeoman.io/"
}, {
  "image": "assets/images/nodejs.png",
  "title": "NodeJS - Server-side Javascript ",
  "url": "https://nodejs.org/en/"
}, {
  "image": "assets/images/expressjs.png",
  "title": "ExpressJS - Web framework",
  "url": "http://expressjs.com/en/index.html"
}, {
  "image": "assets/images/socketio.svg",
  "title": "Socket.io - Websocket library",
  "url": "http://socket.io/"
}, {
  "image": "assets/images/PostgreSQL.png",
  "title": "PostgreSQL - Open source RDBMS",
  "url": "http://www.postgresql.org/"
}, {
  "image": "assets/images/heroku.png",
  "title": "Heroku - Cloud application platform",
  "url": "https://www.heroku.com"
}, {
  "image": "",
  "title": "BitBalloon - Static site hosting platform",
  "url": "https://www.bitballoon.com"
}];

class AboutController {
  constructor(_) {
    'ngInject';

    this.credits = _.sortBy(credits, function(n) {
      return n.title;
    });
  }
}

export default AboutController;
