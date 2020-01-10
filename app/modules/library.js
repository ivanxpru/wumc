const config = require(__basedir + "/config.json");
const fs = require("fs");
const path = require("path");
// const tv = config.library.tv;
const movies = config.library.movies;
let tvChannels = {};
tvChannels.titles = [];
let moviesGenres = [];
let moviesTitles = {};
moviesTitles.titles = [];
const serials = config.library.serials;
let serialsGenres = [];
let serialsTitles = {};
serialsTitles.titles = [];

const getFolders = (directory) => {
  let folders = [];
  console.log(directory);
  fs.readdirSync(directory)
    .forEach(function (pathString) {
      if (fs.lstatSync(path.resolve(directory, pathString)).isDirectory()) {
        folders.push(pathString);
      }
    });
  return folders;
};
/*
exports.getTV = () => {
  tv.forEach(function (data) {
    let channels = getFolders(data.directory);
    channels.forEach (function(channel) {
      let tvChannel = {};
      tvChannel.title = channel;
      tvChannel.path = path.resolve(data.path, channel);
      tvChannel.playlist = fs.readFileSync(path.resolve(data.directory, tvChannel.title, "playlist.txt"), "utf8");
      tvChannels.titles.push(tvChannel);
    });
  });
  fs.writeFileSync("./data/tv.json", JSON.stringify(tvChannels, "", 4));
};
*/
exports.getMovies = () => {
  movies.forEach(function (data) {
    let genres = getFolders(data.directory);
    genres.forEach (function(genre) {
      if(!moviesGenres.includes(genre)) {
        moviesGenres.push(genre);
      }
      let titles = getFolders(path.resolve(data.directory, genre));
      titles.forEach(function (title) {
        let movie = {};
        movie.title = title;
        movie.genre = genre;
        movie.overview = fs.readFileSync(path.resolve(data.directory, genre, title, "overview.txt"), "utf8");
        movie.path = path.resolve(data.path, genre, title);
        moviesTitles.titles.push(movie);
      }); 
    });
  });
  fs.writeFileSync(__basedir + "/data/movies.json", JSON.stringify(moviesTitles, "", 4));
};

exports.getSerials = () => {
  serials.forEach(function (data) {
    let genres = getFolders(data.directory);
    genres.forEach (function (genre) {
      if(!serialsGenres.includes(genre)) {
        serialsGenres.push(genre);
      }
      let titles = getFolders(path.resolve(data.directory, genre));
      titles.forEach(function (title) {
        let serial = {};
        serial.title = title;
        serial.genre = genre;
        serial.overview = fs.readFileSync(path.resolve(data.directory, genre, title, "overview.txt"), "utf8");
        serial.path = path.resolve(data.path, genre, title);
        serial.seasons = [];
        let seasons = getFolders(path.resolve(data.directory, genre, title));
        seasons.forEach(function (season) {
          let dataSeason = {};
          dataSeason.title = season;
          dataSeason.episodes = getFolders(path.resolve(data.directory, genre, title, season));
          serial.seasons.push(dataSeason);
        });
        serialsTitles.titles.push(serial);
      });
    });
  });
  fs.writeFileSync(__basedir + "/data/serials.json", JSON.stringify(serialsTitles, "", 4));
};