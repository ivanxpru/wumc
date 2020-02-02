const xhr = require('./modules/xhr');

const menuItem = document.getElementById('movies');
const hero = document.getElementById('hero');
const heroWrap = document.createElement('div');
const heroHeader = document.createElement('header');
const heroTitle = document.createElement('h2');
const heroCovers = document.createElement('div');
const heroWatch = document.createElement('div');
const protocol = window.location.protocol;
const hostname = window.location.hostname;
const port = window.location.port;
const path = window.location.pathname;
const url = protocol + '//' + hostname + ':' + port + '/api' + path;
let lastScroll = 0;

xhr.getXhrData(url)
.then (data => {
  data.titles.forEach((movie) => {
    const coverLink = document.createElement('a');
    const heroCover = document.createElement('div');
    coverLink.className = 'cover__link';
    coverLink.href = '/movie/title/' + movie.title;
    heroCover.className = 'hero__cover cover';
    heroCover.style.background = "url('" + protocol + '//' + hostname + movie.path + "/poster.jpg') no-repeat center center";
    heroCover.style.backgroundSize = 'contain';
    coverLink.appendChild(heroCover);
    heroCovers.appendChild(coverLink);
  });
});

menuItem.classList.add('menu__item--active');
heroWrap.className = 'hero__wrap';
heroHeader.className = 'hero__header';
heroTitle.className = 'hero__title';
heroCovers.className = 'hero__covers covers';
heroWatch.className = 'hero__watch';
heroTitle.innerText = 'Movies';
heroHeader.appendChild(heroTitle);
heroWrap.appendChild(heroHeader);
heroWrap.appendChild(heroCovers);
heroWrap.appendChild(heroWatch);
hero.style.backgroundSize = 'cover';
hero.appendChild(heroWrap);

// eslint-disable-next-line no-undef
if (wiiu.gamepad) {
  setInterval(() => {
    // eslint-disable-next-line no-undef
    wiiu.gamepad.update();
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
    if (lastScroll > heroCovers.scrollHeight - heroCovers.clientHeight) {
      lastScroll = heroCovers.scrollHeight - heroCovers.clientHeight;
    }
    if (lastScroll < 0) {
      lastScroll = 0;
    }
    heroCovers.scrollTop = lastScroll;
  }, 100);
}
