const hero = document.getElementById('hero');
const heroWrap = document.createElement('div');
const heroHeader = document.createElement('header');
const heroTitle = document.createElement('h2');
const heroGenre = document.createElement('div');
const heroOverview = document.createElement('div');
const heroWatch = document.createElement('div');
const heroLink = document.createElement('a');
const protocol = window.location.protocol;
const hostname = window.location.hostname;
const port = window.location.port;
let data;
let opacity = 0;

heroWrap.className = 'hero__wrap hero__wrap--index';
heroHeader.className = 'hero__header';
heroTitle.className = 'hero__title';
heroGenre.className = 'hero__genre';
heroOverview.className = 'hero__overview';
heroWatch.className = 'hero__watch';
heroLink.className = 'hero__link';

function createSlide() {
  let url;
  let type;
  const xhr = new XMLHttpRequest();
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

setInterval(() => {
  if (opacity === 0) {
    hero.style.opacity = 0;
    opacity = 1;
  } else {
    removeSlide();
    hero.style.opacity = 1;
    opacity = 0;
  }
}, 4500);
