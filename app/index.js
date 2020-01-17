const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config.json');

const app = express();
const appPort = config.express.port;
const indexRouter = require('./app/routes/index');
const apiRouter = require('./routes/api');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/styles', express.static('./public/assets/styles'));
app.use('/scripts', express.static('./public/assets/scripts'));

app.set('views', './views/pages');
app.set('view engine', 'pug');

app.use('/', indexRouter);
app.use('/api', apiRouter);

app.listen(appPort, function () {
  console.log('Запущен сервер express на порту', appPort);
});

process.on('SIGINT', () => {
  // db.close();
  console.log('\nСервер остановлен');
  process.exit();
});
