var hero = document.getElementById('hero');
var heroWrap = document.createElement('div');
var heroHeader = document.createElement('header');
var heroTitle = document.createElement('h2');
var heroGenre = document.createElement('div');
var heroCover = document.createElement('div');
var heroOverview = document.createElement('div');
var heroWatch = document.createElement('div');
var heroLink = document.createElement('a');
var heroHome = document.createElement('div');
var protocol = window.location.protocol;
var hostname = window.location.hostname;
var port = window.location.port;
var path = window.location.pathname;
var url = protocol + '//' + hostname + ':' + port + '/api/' + path;
var xhr = new XMLHttpRequest();
var data;

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
heroCover.style.background = "url('" + protocol + '//' + hostname + data.titles[0].path + "/poster.jpg') no-repeat center center";
heroCover.style.backgroundSize = 'cover';
heroOverview.innerText = data.titles[0].overview;
heroOverview.appendChild(heroGenre);
heroLink.href = protocol + '//' + hostname + data.titles[0].path + '/playlist.m3u8';
heroLink.innerText = 'play';
heroWatch.appendChild(heroLink);
heroWrap.appendChild(heroHeader);
heroWrap.appendChild(heroCover);
heroWrap.appendChild(heroOverview);
heroWrap.appendChild(heroWatch);
hero.style.background = "url('" + protocol + '//' + hostname + data.titles[0].path + "/background.jpg') no-repeat center center";
hero.style.backgroundSize = 'cover';
hero.appendChild(heroWrap);
