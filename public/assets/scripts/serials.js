var footerSerials = document.getElementById('serials');
var hero = document.getElementById('hero');
var heroWrap = document.createElement('div');
var heroHeader = document.createElement('header');
var heroTitle = document.createElement('h2');
var heroCovers = document.createElement('div');
var heroWatch = document.createElement('div');
var protocol = window.location.protocol;
var hostname = window.location.hostname;
var port = window.location.port;
var path = window.location.pathname;
var xhr = new XMLHttpRequest();
var url = protocol + '//' + hostname + ':' + port + '/api/' + path;
var data;

footerSerials.classList.add('menu__item--active');
heroWrap.className = 'hero__wrap';
heroHeader.className = 'hero__header';
heroTitle.className = 'hero__title';
heroCovers.className = 'hero__covers covers';
heroWatch.className = 'hero__watch';

xhr.open('GET', url, false);
xhr.send();
if (xhr.status !== 200) {
  alert(xhr.status + ': ' + xhr.statusText);
} else {
  data = JSON.parse(xhr.response);
}
heroTitle.innerText = 'Serials';
heroHeader.appendChild(heroTitle);
data.titles.forEach(function (serial) {
  var coverLink = document.createElement('a');
  var heroCover = document.createElement('div');
  coverLink.className = 'cover__link';
  coverLink.href = '/serial/title/' + serial.title;
  heroCover.className = 'hero__cover cover';
  heroCover.style.background = "url('" + protocol + '//' + hostname + serial.path + "/poster.jpg') no-repeat center center";
  heroCover.style.backgroundSize = 'contain';
  coverLink.appendChild(heroCover);
  heroCovers.appendChild(coverLink);
});
heroWrap.appendChild(heroHeader);
heroWrap.appendChild(heroCovers);
heroWrap.appendChild(heroWatch);
hero.style.backgroundSize = 'cover';
hero.appendChild(heroWrap);
