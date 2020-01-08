var hero = document.getElementById("hero");
var heroWrap = document.createElement("div");
heroWrap.className = "hero__wrap";
var coverLink = document.createElement("a");
coverLink.className = "cover__link cover__link--overview";
var heroCover = document.createElement("div");
heroCover.className = "hero__cover hero__cover--overview cover";
var heroPlaylist = document.createElement("ol");
heroPlaylist.className = "hero__playlist";
var heroHeader = document.createElement("div");
heroHeader.className = "hero__header";
var heroTitle = document.createElement("h2");
heroTitle.className = "hero__title";
var heroOverview = document.createElement("div");
heroOverview.className = "hero__overview";
var wiiu;
var lastScroll = 0;
var protocol = window.location.protocol;
var hostname = window.location.hostname;
var port = window.location.port;
var path = window.location.pathname;
var xhr = new XMLHttpRequest();
var url = protocol + "//" + hostname + ":" + port + "/api/" + path;

xhr.open("GET", url, false);
xhr.send();
if (xhr.status != 200) {
  alert( xhr.status + ": " + xhr.statusText );
} else {
  var data = JSON.parse(xhr.response);
}
heroTitle.innerText = data.titles[0].title + " • " + data.titles[0].seasons[0].title;
heroHeader.appendChild(heroTitle);
coverLink.href = "/serial/title/" + data.titles[0].title;
heroCover.style.background = "url('" + protocol + "//" + hostname + data.titles[0].path + "/" + data.titles[0].seasons[0].title + "/poster.jpg') no-repeat left center";
heroCover.style.backgroundSize = "contain";
coverLink.appendChild(heroCover);
data.titles[0].seasons[0].episodes.forEach(function (episode) {
  var heroEpisode = document.createElement("li");
  heroEpisode.className = "hero__episode";
  heroEpisode.innerHTML = "<a href='" + protocol + "//" + hostname + data.titles[0].path + "/" + data.titles[0].seasons[0].title + "/" + episode.replace("?", "%3f") + "/playlist.m3u8'>"+episode.split(/\.(.+)/)[1]+"</a>";
  heroPlaylist.appendChild(heroEpisode);
});
heroOverview.appendChild(heroPlaylist);
heroWrap.appendChild(heroHeader);
heroWrap.appendChild(coverLink);
heroWrap.appendChild(heroOverview);
hero.style.background = "url('" + protocol + "//" + hostname +  data.titles[0].path + "/" + data.titles[0].seasons[0].title + "/background.jpg') no-repeat center center";
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





