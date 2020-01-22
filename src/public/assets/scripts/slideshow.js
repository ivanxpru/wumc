var hero = document.getElementById('hero');
var heroWrap = document.createElement('div');
var heroHeader = document.createElement('header');
var heroTitle = document.createElement('h2');
var heroGenre = document.createElement('div');
var heroOverview = document.createElement('div');
var heroWatch = document.createElement('div');
var heroLink = document.createElement('a');
var opacity = 0;
var protocol = window.location.protocol;
var hostname = window.location.hostname;
var port = window.location.port;
var data;

heroWrap.className = 'hero__wrap hero__wrap--index';
heroHeader.className = 'hero__header';
heroTitle.className = 'hero__title';
heroGenre.className = 'hero__genre';
heroOverview.className = 'hero__overview';
heroWatch.className = 'hero__watch';
heroLink.className = 'hero__link';

function createSlide() {
  var url;
  var type;
  var xhr = new XMLHttpRequest();
  if (Math.random() > 0.5) {
    url = protocol + '//' + hostname + ':' + port + '/api/movies/random';
    type = 'movie';
  } else {
    url = protocol + '//' + hostname + ':' + port + '/api/serials/random';
    type = 'serial';
  }
  xhr.open('GET', url, false);
  xhr.send();
  if (xhr.status !== 200) {
    alert(xhr.status + ': ' + xhr.statusText);
  } else {
    data = JSON.parse(xhr.response);
  }
  heroTitle.innerText = data.titles[0].title;
  heroGenre.innerText = '#' + data.titles[0].genre;
  heroHeader.appendChild(heroTitle);
  heroOverview.innerText = data.titles[0].overview;
  heroOverview.appendChild(heroGenre);
  heroLink.href = protocol + '//' + hostname + ':' + port + '/' + type + '/title/' + data.titles[0].title;
  heroLink.innerText = 'watch';
  heroWatch.appendChild(heroLink);
  heroWrap.appendChild(heroHeader);
  heroWrap.appendChild(heroOverview);
  heroWrap.appendChild(heroWatch);
  hero.style.background = "url('" + protocol + '//' + hostname + '/' + data.titles[0].path + "/background.jpg') no-repeat center center";
  hero.style.backgroundSize = 'cover';
  hero.appendChild(heroWrap);
}

function removeSlide() {
  heroHeader.removeChild(heroTitle);
  heroWrap.removeChild(heroHeader);
  heroOverview.removeChild(heroGenre);
  heroWrap.removeChild(heroOverview);
  heroWatch.removeChild(heroLink);
  heroWrap.removeChild(heroWatch);
  hero.removeChild(heroWrap);
  createSlide();
}

createSlide();

setInterval(function () {
  if (opacity === 0) {
    hero.style.opacity = 0;
    opacity = 1;
  } else {
    removeSlide();
    hero.style.opacity = 1;
    opacity = 0;
  }
}, 4500);
