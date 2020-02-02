const xhr = require('./modules/xhr');

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
const url = protocol + '//' + hostname + ':' + port + '/api/' + path;
let lastScroll = 0;

xhr.getXhrData(url)
  .then((data) => {
    heroTitle.innerText = data.titles[0].title + ' • ' + data.titles[0].seasons[0].title;
    coverLink.href = '/serial/title/' + data.titles[0].title;
    data.titles[0].seasons[0].episodes.forEach((episode) => {
      const heroEpisode = document.createElement('li');
      heroEpisode.className = 'hero__episode';
      heroEpisode.innerHTML = "<a href='" + protocol + '//' + hostname + data.titles[0].path + '/' + data.titles[0].seasons[0].title + '/' + episode.replace('?', '%3f') + "/playlist.m3u8'>" + episode.split(/\.(.+)/)[1] + '</a>';
      heroPlaylist.appendChild(heroEpisode);
    });
    heroCover.style.background = "url('" + protocol + '//' + hostname + data.titles[0].path + '/' + data.titles[0].seasons[0].title + "/poster.jpg') no-repeat left center";
    hero.style.background = "url('" + protocol + '//' + hostname + data.titles[0].path + '/' + data.titles[0].seasons[0].title + "/background.jpg') no-repeat center center";
  });

heroWrap.className = 'hero__wrap';
coverLink.className = 'cover__link cover__link--overview';
heroCover.className = 'hero__cover hero__cover--overview cover';
heroPlaylist.className = 'hero__playlist';
heroHeader.className = 'hero__header';
heroTitle.className = 'hero__title';
heroOverview.className = 'hero__overview';
heroHeader.appendChild(heroTitle);
heroCover.style.backgroundSize = 'contain';
coverLink.appendChild(heroCover);
heroOverview.appendChild(heroPlaylist);
heroWrap.appendChild(heroHeader);
heroWrap.appendChild(coverLink);
heroWrap.appendChild(heroOverview);
hero.style.backgroundSize = 'cover';
hero.appendChild(heroWrap);

// eslint-disable-next-line no-undef
if (wiiu.gamepad) {
  setInterval(() => {
    // eslint-disable-next-line no-undef
    wiiu.gamepad.update();
    // eslint-disable-next-line no-undef
    // eslint-disable-next-line no-undef
    if (wiiu.gamepad.lStickY > 0) {
      // eslint-disable-next-line no-undef
      lastScroll = lastScroll - Math.abs(wiiu.gamepad.lStickY * 20);
    }
    // eslint-disable-next-line no-undef
    if (wiiu.gamepad.lStickY < 0) {
      // eslint-disable-next-line no-undef
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
}
