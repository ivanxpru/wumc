const footerSerials = document.getElementById('serials');
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
const xhr = new XMLHttpRequest();
const url = protocol + '//' + hostname + ':' + port + '/api/' + path;

footerSerials.classList.add('menu__item--active');
heroWrap.className = 'hero__wrap';
heroHeader.className = 'hero__header';
heroTitle.className = 'hero__title';
heroCovers.className = 'hero__covers covers';
heroWatch.className = 'hero__watch';

xhr.open('GET', url);
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status !== 200) {
      console.log(xhr.status);
    } else {
      const data = JSON.parse(xhr.response);
      data.titles.forEach((serial) => {
        const coverLink = document.createElement('a');
        const heroCover = document.createElement('div');
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
    }
  }
};
xhr.send();
heroTitle.innerText = 'Serials';
heroHeader.appendChild(heroTitle);
heroWrap.appendChild(heroWatch);
hero.style.backgroundSize = 'cover';
hero.appendChild(heroWrap);
