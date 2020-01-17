const fs = require('fs');
const express = require('express');
// const channels = require('../../data/tv.json');
const movies = require('../../data/serials.json');
const serials = require('../../data/serials.json');

const router = express.Router();
const library = require('../modules/library');

const sortTitles = (a, b) => {
  if (a.title < b.title) {
    return -1;
  }
  return 1;
};

const sortNames = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  return 1;
};

// Обновление каталога
router.get('/update', function (_req, res) {
  if (!fs.existsSync('../../data')) {
    fs.mkdirSync('../../data');
  }
  // library.getTV();
  library.getMovies();
  library.getSerials();
  res.sendStatus(200);
});

// CORS on ExpressJS
router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Полный каталог ТВ каналов
router.get('/tv', function (req, res) {
  const titles = [];
  channels.playlist.feed.forEach(function (channel) {
    titles.push(channel);
  });
  titles.sort(sortNames);
  const response = {};
  response.titles = titles;
  res.json(response);
});

// Полный каталог фильмов
router.get('/movies', function (req, res) {
  const response = {};
  const titles = [];
  movies.titles.forEach(function (movie) {
    titles.push(movie);
  });
  titles.sort(sortTitles);
  response.titles = titles;
  res.json(response);
});

// Отдельный фильм
router.get('/movie/title/:title', function (req, res) {
  const title = decodeURI(req.params.title);
  const result = movies.titles.filter(function (el) {
    return el.title.indexOf(title) > -1;
  });
  const response = {};
  response.titles = result;
  res.json(response);
});

// Полный каталог сериалов
router.get('/serials', function (req, res) {
  const response = {};
  const titles = [];
  serials.titles.forEach(function (serial) {
    const data = {};
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
router.get('/serial/title/:title', function (req, res) {
  const title = req.params;
  library.getSerials(req.app.locals.collectionSerials);
  const resultSerial = serials.titles.filter(function (el) {
    return el.title.indexOf(title) > -1;
  });
  const response = {};
  console.log(resultSerial);
  response.titles = resultSerial;
  console.log(response);
  res.json(response);
});

// Отдельный сезон сериала
router.get('/serial/title/:title/:season', function (req, res) {
  library.getSerials(req.app.locals.collectionSerials);
  const serial = serials.titles.filter(function (el) {
    return el.title.indexOf(req.params.title) > -1;
  });
  const season = serial[0].seasons.filter(function (el) {
    return el.title.indexOf(req.params.season) > -1;
  });
  const data = {};
  data.title = serial[0].title;
  data.path = serial[0].path;
  data.seasons = season;
  const response = {};
  response.titles = [];
  response.titles.push(data);
  res.json(response);
});

// Случайный фильм
router.get('/movies/random', function (_req, res) {
  const title = movies.titles[Math.floor(Math.random() * movies.titles.length)];
  const response = {};
  response.titles = [];
  response.titles.push(title);
  res.json(response);
});

// Случайный сериал
router.get('/serials/random', function (_req, res) {
  const serial = serials.titles[Math.floor(Math.random() * serials.titles.length)];
  const data = {};
  data.title = serial.title;
  data.genre = serial.genre;
  data.overview = serial.overview;
  data.path = serial.path;
  const response = {};
  response.titles = [];
  response.titles.push(data);
  res.json(response);
});

module.exports = router;
