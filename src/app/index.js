const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config.json');

const app = express();
const appPort = config.express.port;
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/styles', express.static('./dist/public/assets/styles'));
app.use('/scripts', express.static('./dist/public/assets/scripts'));

app.set('views', './dist/app/views/pages');
app.set('view engine', 'pug');

app.use('/', indexRouter);
app.use('/api', apiRouter);

app.listen(appPort, () => {
  console.log('Запущен сервер express на порту', appPort);
});

process.on('SIGINT', () => {
  // db.close();
  console.log('\nСервер остановлен');
  process.exit();
});
