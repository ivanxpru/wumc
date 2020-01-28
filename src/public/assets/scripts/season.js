const hero = document.getElementById('hero');
const heroWrap = document.createElement('div');
const coverLink = document.createElement('a');
const heroCover = document.createElement('div');
const heroPlaylist = document.createElement('ol');
const heroHeader = document.createElement('header');
const heroTitle = document.createElement('h2');
const heroOverview = document.createElement('div');
const protocol = window.location.protocol;
const hostname = window.location.hostname;
const port = window.location.port;
const path = window.location.pathname;
const xhr = new XMLHttpRequest();
const url = protocol + '//' + hostname + ':' + port + '/api/' + path;
let data;
let wiiu;
let lastScroll = 0;

heroWrap.className = 'hero__wrap';
coverLink.className = 'cover__link cover__link--overview';
heroCover.className = 'hero__cover hero__cover--overview cover';
heroPlaylist.className = 'hero__playlist';
heroHeader.className = 'hero__header';
heroTitle.className = 'hero__title';
heroOverview.className = 'hero__overview';
xhr.open('GET', url, false);
xhr.send();
if (xhr.status !== 200) {
  alert(xhr.status + ': ' + xhr.statusText);
} else {
  data = JSON.parse(xhr.response);
}
heroTitle.innerText = data.titles[0].title + ' • ' + data.titles[0].seasons[0].title;
heroHeader.appendChild(heroTitle);
coverLink.href = '/serial/title/' + data.titles[0].title;
heroCover.style.background = "url('" + protocol + '//' + hostname + data.titles[0].path + '/' + data.titles[0].seasons[0].title + "/poster.jpg') no-repeat left center";
heroCover.style.backgroundSize = 'contain';
coverLink.appendChild(heroCover);
data.titles[0].seasons[0].episodes.forEach((episode) => {
  const heroEpisode = document.createElement('li');
  heroEpisode.className = 'hero__episode';
  heroEpisode.innerHTML = "<a href='" + protocol + '//' + hostname + data.titles[0].path + '/' + data.titles[0].seasons[0].title + '/' + episode.replace('?', '%3f') + "/playlist.m3u8'>" + episode.split(/\.(.+)/)[1] + '</a>';
  heroPlaylist.appendChild(heroEpisode);
});
heroOverview.appendChild(heroPlaylist);
heroWrap.appendChild(heroHeader);
heroWrap.appendChild(coverLink);
heroWrap.appendChild(heroOverview);
hero.style.background = "url('" + protocol + '//' + hostname + data.titles[0].path + '/' + data.titles[0].seasons[0].title + "/background.jpg') no-repeat center center";
hero.style.backgroundSize = 'cover';
hero.appendChild(heroWrap);

setInterval(() => {
  wiiu.gamepad.update();
  if (wiiu.gamepad.lStickY > 0) {
    lastScroll = lastScroll - Math.abs(wiiu.gamepad.lStickY * 20);
  }
  if (wiiu.gamepad.lStickY < 0) {
    lastScroll = lastScroll + Math.abs(wiiu.gamepad.lStickY * 20);
  }
  if (lastScroll > heroOverview.scrollHeight - heroOverview.clientHeight) {
    lastScroll = heroOverview.scrollHeight - heroOverview.clientHeight;
  }
  if (lastScroll < 0) {
    lastScroll = 0;
  }
  heroOverview.scrollTop = lastScroll;
}, 100);
