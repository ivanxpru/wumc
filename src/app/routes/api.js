const express = require('express');
const fs = require('fs');

const router = express.Router();
const library = require('../modules/library');

const sortTitles = (a, b) => {
  if (a.title < b.title) {
    return -1;
  }
  return 1;
};

// Первое обновление каталога
library.getMovies();
library.getSerials();

// Обновление каталога по требованию
router.get('/update', (_req, res) => {
  // library.getTV();
  library.getMovies();
  library.getSerials();
  res.sendStatus(200);
});

// CORS on ExpressJS
router.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Полный каталог ТВ каналов
/*
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
*/

// Полный каталог фильмов
router.get('/movies', (_req, res) => {
  const response = {};
  const titles = [];
  let movies = {};
  movies = JSON.parse(fs.readFileSync('../../data/movies.json'));
  movies.titles.forEach((movie) => {
    titles.push(movie);
  });
  titles.sort(sortTitles);
  response.titles = titles;
  res.json(response);
});

// Отдельный фильм
router.get('/movie/title/:title', (req, res) => {
  let movies = {};
  movies = JSON.parse(fs.readFileSync('../../data/movies.json'));
  const result = movies.titles.filter((el) => el.title.indexOf(req.params.title) > -1);
  const response = {};
  response.titles = result;
  res.json(response);
});

// Полный каталог сериалов
router.get('/serials', (req, res) => {
  const response = {};
  const titles = [];
  let serials = {};
  serials = JSON.parse(fs.readFileSync('../../data/serials.json'));
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
  const response = {};
  let serials = {};
  serials = JSON.parse(fs.readFileSync('../../data/serials.json'));
  response.titles = serials.titles.filter((el) => el.title.indexOf(req.params.title) > -1);
  res.json(response);
});

// Отдельный сезон сериала
router.get('/serial/title/:title/:season', (req, res) => {
  let serials = {};
  serials = JSON.parse(fs.readFileSync('../../data/serials.json'));
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
  let movies = {};
  movies = JSON.parse(fs.readFileSync('../../data/movies.json'));
  const title = movies.titles[Math.floor(Math.random() * movies.titles.length)];
  const response = {};
  response.titles = [];
  response.titles.push(title);
  res.json(response);
});

// Случайный сериал
router.get('/serials/random', (_req, res) => {
  let serials = {};
  serials = JSON.parse(fs.readFileSync('../../data/serials.json'));
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
