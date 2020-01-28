const fs = require('fs');
const path = require('path');

// const tv = config.library.tv;
const config = require('../../config.json');

const movies = config.library.movies;
const tvChannels = {};
tvChannels.titles = [];
const moviesGenres = [];
const moviesTitles = {};
moviesTitles.titles = [];
const serials = config.library.serials;
const serialsGenres = [];
const serialsTitles = {};
serialsTitles.titles = [];

const getFolders = (directory) => {
  const folders = [];
  console.log(directory);
  fs.readdirSync(directory)
    .forEach((pathString) => {
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
  if (!fs.existsSync('./dist/data')) {
    fs.mkdirSync('./dist/data');
  }
  movies.forEach((data) => {
    const genres = getFolders(data.directory);
    genres.forEach((genre) => {
      if (!moviesGenres.includes(genre)) {
        moviesGenres.push(genre);
      }
      const titles = getFolders(path.resolve(data.directory, genre));
      titles.forEach((title) => {
        const movie = {};
        movie.title = title;
        movie.genre = genre;
        movie.overview = fs.readFileSync(path.resolve(data.directory, genre, title, 'overview.txt'), 'utf8');
        movie.path = path.resolve(data.path, genre, title);
        moviesTitles.titles.push(movie);
      });
    });
  });
  fs.writeFileSync('./dist/data/movies.json', JSON.stringify(moviesTitles, '', 4));
};

exports.getSerials = () => {
  if (!fs.existsSync('./dist/data')) {
    fs.mkdirSync('./dist/data');
  }
  serials.forEach((data) => {
    const genres = getFolders(data.directory);
    genres.forEach((genre) => {
      if (!serialsGenres.includes(genre)) {
        serialsGenres.push(genre);
      }
      const titles = getFolders(path.resolve(data.directory, genre));
      titles.forEach((title) => {
        const serial = {};
        serial.title = title;
        serial.genre = genre;
        serial.overview = fs.readFileSync(path.resolve(data.directory, genre, title, 'overview.txt'), 'utf8');
        serial.path = path.resolve(data.path, genre, title);
        serial.seasons = [];
        const seasons = getFolders(path.resolve(data.directory, genre, title));
        seasons.forEach((season) => {
          const dataSeason = {};
          dataSeason.title = season;
          dataSeason.episodes = getFolders(path.resolve(data.directory, genre, title, season));
          serial.seasons.push(dataSeason);
        });
        serialsTitles.titles.push(serial);
      });
    });
  });
  fs.writeFileSync('./dist/data/serials.json', JSON.stringify(serialsTitles, '', 4));
};
