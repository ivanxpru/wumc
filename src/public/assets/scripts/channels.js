const menuItem = document.getElementById('tv');
const hero = document.getElementById('hero');
const heroWrap = document.createElement('div');
const heroHeader = document.createElement('header');
const heroTitle = document.createElement('h2');
const heroPlaylist = document.createElement('ol');
const heroOverview = document.createElement('div');
const xhr = new XMLHttpRequest();
const protocol = window.location.protocol;
const hostname = window.location.hostname;
const port = window.location.port;
const path = window.location.pathname;
const url = protocol + '//' + hostname + ':' + port + '/api' + path;
let lastScroll = 0;

menuItem.classList.add('menu__item--active');
heroWrap.className = 'hero__wrap';
heroHeader.className = 'hero__header';
heroTitle.className = 'hero__title';
heroPlaylist.className = 'hero__playlist';
heroOverview.className = 'hero__overview';
xhr.open('GET', url);
if (xhr.readyState === 4) {
  if (xhr.status !== 200) {
    console.log(xhr.status);
  } else {
    const data = JSON.parse(xhr.response);
    data.titles.forEach((channel) => {
      const heroChannel = document.createElement('li');
      const channelLink = document.createElement('a');
      heroChannel.className = 'hero__channel';
      channelLink.className = 'channel__link';
      channelLink.href = channel.url_hls;
      channelLink.innerText = channel.name;
      heroChannel.appendChild(channelLink);
      heroPlaylist.appendChild(heroChannel);
    });
  }
}
xhr.send();
heroTitle.innerText = 'TV Channels';
heroHeader.appendChild(heroTitle);
// hero.style.background = "url('http://192.168.1.35" + data.titles[0].path + "/background.jpg') no-repeat center center";
hero.style.backgroundSize = 'cover';
hero.appendChild(heroWrap);


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
  if (lastScroll > heroOverview.scrollHeight - heroOverview.clientHeight) {
    lastScroll = heroOverview.scrollHeight - heroOverview.clientHeight;
  }
  if (lastScroll < 0) {
    lastScroll = 0;
  }
  heroOverview.scrollTop = lastScroll;
}, 100);
