const xhr = require('./modules/xhr');

const hero = document.getElementById('hero');
const heroWrap = document.createElement('div');
const heroHeader = document.createElement('header');
const heroTitle = document.createElement('h2');
const heroGenre = document.createElement('div');
const heroCover = document.createElement('div');
const heroOverview = document.createElement('div');
const heroWatch = document.createElement('div');
const heroLink = document.createElement('a');
const heroHome = document.createElement('div');
const protocol = window.location.protocol;
const hostname = window.location.hostname;
const port = window.location.port;
const path = window.location.pathname;
const url = protocol + '//' + hostname + ':' + port + '/api/' + path;
let data;

xhr.getXhrData(url)
.then (data => {
  heroTitle.innerText = data.titles[0].title;
  heroGenre.innerText = '#' + data.titles[0].genre;
  heroOverview.innerText = data.titles[0].overview;
  heroLink.href = protocol + '//' + hostname + data.titles[0].path + '/playlist.m3u8';
  heroCover.style.background = "url('" + protocol + '//' + hostname + data.titles[0].path + "/poster.jpg') no-repeat center center";
  hero.style.background = "url('" + protocol + '//' + hostname + data.titles[0].path + "/background.jpg') no-repeat center center";
});

heroWrap.className = 'hero__wrap';
heroHeader.className = 'hero__header';
heroTitle.className = 'hero__title';
heroGenre.className = 'hero__genre';
heroCover.className = 'hero__cover cover';
heroOverview.className = 'hero__overview';
heroWatch.className = 'hero__watch';
heroLink.className = 'hero__link';
heroHome.className = 'hero__home';
heroHome.innerText = '';
heroHeader.appendChild(heroTitle);
heroCover.style.backgroundSize = 'cover';
heroOverview.appendChild(heroGenre);
heroLink.innerText = 'play';
heroWatch.appendChild(heroLink);
heroWrap.appendChild(heroHeader);
heroWrap.appendChild(heroCover);
heroWrap.appendChild(heroOverview);
heroWrap.appendChild(heroWatch);
hero.style.backgroundSize = 'cover';
hero.appendChild(heroWrap);
