var menuItem = document.getElementById("tv");
menuItem.classList.add("menu__item--active");
var hero = document.getElementById("hero");
var heroWrap = document.createElement("div");
heroWrap.className = "hero__wrap";
var heroHeader = document.createElement("div");
heroHeader.className = "hero__header";
var heroTitle = document.createElement("h2");
heroTitle.className = "hero__title";
var heroPlaylist = document.createElement("ol");
heroPlaylist.className = "hero__playlist";
var heroOverview = document.createElement("div");
heroOverview.className = "hero__overview";
var wiiu;
var lastScroll = 0;
var xhr = new XMLHttpRequest();
var protocol = window.location.protocol;
var hostname = window.location.hostname;
var port = window.location.port;
var path = window.location.pathname;
var url = protocol + "//" + hostname + ":" + port + "/api" + path;
console.log(url);
xhr.open("GET", url, false);
xhr.send();
if (xhr.status != 200) {
  alert( xhr.status + ": " + xhr.statusText );
} else {
  var data = JSON.parse(xhr.response);
}
heroTitle.innerText = "TV Channels";
heroHeader.appendChild(heroTitle);
data.titles.forEach(function (channel) {
  var heroChannel = document.createElement("li");
  heroChannel.className = "hero__channel";
  var channelLink = document.createElement("a");
  channelLink.className = "channel__link";
  channelLink.href = channel.url_hls;
  channelLink.innerText = channel.name;
  heroChannel.appendChild(channelLink);
  heroPlaylist.appendChild(heroChannel);
});
heroOverview.appendChild(heroPlaylist);
heroWrap.appendChild(heroHeader);
heroWrap.appendChild(heroOverview);
//hero.style.background = "url('http://192.168.1.35" + data.titles[0].path + "/background.jpg') no-repeat center center";
hero.style.backgroundSize = "cover";
hero.appendChild(heroWrap);


setInterval(function(){
  wiiu.gamepad.update();
  if (wiiu.gamepad.lStickY > 0) {
    lastScroll = lastScroll - Math.abs(wiiu.gamepad.lStickY*20);
  }
  if (wiiu.gamepad.lStickY < 0) {
    lastScroll = lastScroll + Math.abs(wiiu.gamepad.lStickY*20);
  }
  if (lastScroll > heroOverview.scrollHeight - heroOverview.clientHeight) {
    lastScroll = heroOverview.scrollHeight - heroOverview.clientHeight;
  }
  if (lastScroll < 0) {
    lastScroll = 0;
  }
  heroOverview.scrollTop = lastScroll;
}, 100);