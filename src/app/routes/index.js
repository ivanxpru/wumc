const express = require('express');

const router = express.Router();

router.get('/', (_req, res) => {
  res.type('html');
  res.render('index', { title: 'Wii U Media Center' });
});

router.get('/tv', (_req, res) => {
  res.type('html');
  res.render('channels', { title: 'TV Channels' });
});

router.get('/movies', (_req, res) => {
  res.type('html');
  res.render('movies', { title: 'Movies' });
});

router.get('/movie/title/:title', (req, res) => {
  const title = decodeURI(req.params.title);
  res.type('html');
  res.render('movie', { title });
});

router.get('/serials', (_req, res) => {
  res.type('html');
  res.render('serials', { title: 'Serials' });
});

router.get('/serial/title/:title', (req, res) => {
  const title = decodeURI(req.params.title);
  res.type('html');
  res.render('serial', { title });
});

router.get('/serial/title/:title/:season', (req, res) => {
  const title = `${decodeURI(req.params.title)} • ${req.params.season}`;
  res.type('html');
  res.render('season', { title });
});

module.exports = router;
