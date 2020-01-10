const fs = require('fs');
const express = require('express');

const router = express.Router();
const library = require(__basedir + '/app/modules/library');

const sortTitles = (a, b) => {
  if (a.title < b.title) {
    return -1;
  // eslint-disable-next-line no-else-return
  } else {
    return 1;
  }
};
const sortNames = (a, b) => {
  if (a.name < b.name) {
    return -1;
  // eslint-disable-next-line no-else-return
  } else {
    return 1;
  }
};

// Обновление каталога
router.get('/update', (_req, res) => {
  if (!fs.existsSync(__basedir + '/data')) {
    fs.mkdirSync(__basedir + '/data');
  }
  // library.getTV();
  library.getMovies();
  library.getSerials();
  res.sendStatus(200);
});

// CORS on ExpressJS
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Полный каталог ТВ каналов
router.get('/tv', (req, res) => {
  const channels = require(__basedir + '/data/tv.json');
  const titles = [];
  channels.playlist.feed.forEach((channel) => {
    titles.push(channel);
  });
  titles.sort(sortNames);
  const response = {};
  response.titles = titles;
  res.json(response);
});

// Полный каталог фильмов
router.get('/movies', (req, res) => {
  // library.getMovies();
  const movies = require(__basedir + '/data/movies.json');
  const response = {};
  const titles = [];
  movies.titles.forEach((movie) => {
    titles.push(movie);
  });
  titles.sort(sortTitles);
  response.titles = titles;
  res.json(response);
});

// Отдельный фильм
router.get('/movie/title/:title', (req, res) => {
  const title = decodeURI(req.params.title);
  const movies = require(__basedir + '/data/movies.json');
  const result = movies.titles.filter((el) => el.title.indexOf(title) > -1);
  const response = {};
  response.titles = result;
  res.json(response);
});

// Полный каталог сериалов
router.get('/serials', (req, res) => {
  // library.getSerials();
  const serials = require(__basedir + '/data/serials.json');
  const response = {};
  const titles = [];
  serials.titles.forEach((serial) => {
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
router.get('/serial/title/:title', (req, res) => {
  const { title } = req.params;
  library.getSerials(req.app.locals.collectionSerials);
  const serials = require(__basedir + '/data/serials.json');
  const resultSerial = serials.titles.filter((el) => el.title.indexOf(title) > -1);
  const response = {};
  response.titles = resultSerial;
  res.json(response);
});

// Отдельный сезон сериала
router.get('/serial/title/:title/:season', (req, res) => {
  library.getSerials(req.app.locals.collectionSerials);
  const serials = require(__basedir + '/data/serials.json');
  const serial = serials.titles.filter((el) => el.title.indexOf(req.params.title) > -1);
  const season = serial[0].seasons.filter((el) => el.title.indexOf(req.params.season) > -1);
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
router.get('/movies/random', (_req, res) => {
  const movies = require(__basedir + '/data/movies.json');
  const title = movies.titles[Math.floor(Math.random() * movies.titles.length)];
  const response = {};
  response.titles = [];
  response.titles.push(title);
  res.json(response);
});

// Случайный сериал
router.get('/serials/random', (_req, res) => {
  const serials = require(__basedir + '/data/serials.json');
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
