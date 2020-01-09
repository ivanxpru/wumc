const fs = require('fs');
const express = require("express");
const router = express.Router();
const library = require(__basedir + "/app/modules/library");

const sortTitles =  (a, b) => {
  if (a.title < b.title) {
    return -1;
  } else {
    return 1;
  } 
};
const sortNames =  (a, b) => {
  if (a.name < b.name) {
    return -1;
  } else {
    return 1;
  } 
};

//Обновление каталога
router.get("/update", function (_req, res) {
  if (!fs.existsSync(__basedir + "/data")){
    fs.mkdirSync(__basedir + "/data");
}
  //library.getTV();
  library.getMovies();
  library.getSerials();
  res.sendStatus(200);
});

// CORS on ExpressJS
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Полный каталог ТВ каналов
router.get("/tv", function (req, res) {
  let channels = require(__basedir + "/data/tv.json");
  let titles = [];
  channels.playlist.feed.forEach(function (channel) {
    titles.push(channel);
  });
  titles.sort(sortNames);
  let response = {};
  response.titles = titles;
  res.json(response);
});

// Полный каталог фильмов
router.get("/movies", function (req, res) {
  // library.getMovies();
  let movies = require(__basedir + "/data/movies.json");
  let response = {};
  let titles = [];
  movies.titles.forEach(function (movie) {
    titles.push(movie);
  });
  titles.sort(sortTitles);
  response.titles = titles;
  res.json(response);
});

// Отдельный фильм
router.get("/movie/title/:title", function (req, res) {
  let title = decodeURI(req.params.title);
  let movies = require(__basedir + "/data/movies.json");
  let result = movies.titles.filter(function (el) {
    return el.title.indexOf(title) > -1;
  });
  let response = {};
  response.titles = result;
  res.json(response);
});

// Полный каталог сериалов
router.get("/serials", function (req, res) {
  // library.getSerials();
  let serials = require(__basedir + "/data/serials.json");
  let response = {};
  let titles = [];
  serials.titles.forEach(function (serial) {
    let data = {};
    data.title = serial.title;
    data.genre = serial.genre;
    data.path = serial.path;
    titles.push(data);
  });
  titles.sort(sortTitles);
  response.titles = titles;
  res.json(response);
});

// Отдельный сериал
router.get("/serial/title/:title", function (req, res) {
  let title = req.params.title;
  library.getSerials(req.app.locals.collectionSerials);
  let serials = require(__basedir + "/data/serials.json");
  let resultSerial = serials.titles.filter(function (el) {
    return el.title.indexOf(title) > -1;
  });
  let response = {};
  response.titles = resultSerial;
  res.json(response);
});

// Отдельный сезон сериала
router.get("/serial/title/:title/:season", function (req, res) {
  library.getSerials(req.app.locals.collectionSerials);
  let serials = require(__basedir + "/data/serials.json");
  let serial = serials.titles.filter(function (el) {
    return el.title.indexOf(req.params.title) > -1;
  });
  let season = serial[0].seasons.filter(function (el) {
    return el.title.indexOf(req.params.season) > -1;
  });
  let data = {};
  data.title = serial[0].title;
  data.path = serial[0].path;
  data.seasons = season;
  let response = {};
  response.titles = [];
  response.titles.push(data);
  res.json(response);
});

//Случайный фильм
router.get("/movies/random", function (_req, res) {
  let movies = require(__basedir + "/data/movies.json");
  let title = movies.titles[Math.floor(Math.random()*movies.titles.length)];
  let response = {};
  response.titles = [];
  response.titles.push(title);
  res.json(response);
});

//Случайный сериал
router.get("/serials/random", function (_req, res) {
  let serials = require(__basedir + "/data/serials.json");
  let serial = serials.titles[Math.floor(Math.random()*serials.titles.length)];
  let data = {};
  data.title = serial.title;
  data.genre = serial.genre;
  data.overview = serial.overview;
  data.path = serial.path;
  let response = {};
  response.titles = [];
  response.titles.push(data);
  res.json(response);
});

module.exports = router;