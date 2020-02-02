const xhr = require('./modules/xhr');

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
const url = protocol + '//' + hostname + ':' + port + '/api/' + path;

xhr.getXhrData(url)
  .then((data) => {
    heroTitle.innerText = data.titles[0].title;
    data.titles[0].seasons.forEach((season) => {
      const coverLink = document.createElement('a');
      const heroCover = document.createElement('div');
      coverLink.className = 'cover__link';
      coverLink.href = '/serial/title/' + data.titles[0].title + '/' + season.title;
      heroCover.className = 'hero__cover cover';
      heroCover.style.background = "url('" + protocol + '//' + hostname + data.titles[0].path + '/' + season.title + "/poster.jpg') no-repeat center center";
      heroCover.style.backgroundSize = 'contain';
      coverLink.appendChild(heroCover);
      heroCovers.appendChild(coverLink);
    });
    hero.style.background = "url('" + protocol + '//' + hostname + data.titles[0].path + "/background.jpg') no-repeat center center";
  });

heroWrap.className = 'hero__wrap';
heroHeader.className = 'hero__header';
heroTitle.className = 'hero__title';
heroCovers.className = 'hero__covers covers';
heroWatch.className = 'hero__watch';
heroHeader.appendChild(heroTitle);
heroWrap.appendChild(heroHeader);
heroWrap.appendChild(heroCovers);
heroWrap.appendChild(heroWatch);
hero.style.backgroundSize = 'cover';
hero.appendChild(heroWrap);
