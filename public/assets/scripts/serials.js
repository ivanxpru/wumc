var footerSerials = document.getElementById("serials");
footerSerials.classList.add("menu__item--active");
var hero = document.getElementById("hero");
var heroWrap = document.createElement("div");
heroWrap.className = "hero__wrap";
var heroHeader = document.createElement("div");
heroHeader.className = "hero__header";
var heroTitle = document.createElement("h2");
heroTitle.className = "hero__title";
var heroCovers = document.createElement("div");
heroCovers.className = "hero__covers covers";
var heroWatch = document.createElement("div");
heroWatch.className ="hero__watch";
var protocol = window.location.protocol;
var hostname = window.location.hostname;
var port = window.location.port;
var path = window.location.pathname;


var xhr = new XMLHttpRequest();
var url = protocol + "//" + hostname + ":" + port + "/api" + path;
xhr.open("GET", url, false);
xhr.send();
if (xhr.status != 200) {
  alert( xhr.status + ": " + xhr.statusText );
} else {
  var data = JSON.parse(xhr.response);
}
heroTitle.innerText = "Serials";
heroHeader.appendChild(heroTitle);
data.titles.forEach(function (serial) {
  var coverLink = document.createElement("a");
  coverLink.className = "cover__link";
  coverLink.href = "/serial/title/" + serial.title;
  var heroCover = document.createElement("div");
  heroCover.className = "hero__cover cover";
  heroCover.style.background = "url('" + protocol + "//" + hostname + serial.path + "/poster.jpg') no-repeat center center";
  heroCover.style.backgroundSize = "cover";
  coverLink.appendChild(heroCover);
  heroCovers.appendChild(coverLink);
});
heroWrap.appendChild(heroHeader);
heroWrap.appendChild(heroCovers);
heroWrap.appendChild(heroWatch);
hero.style.backgroundSize = "cover";
hero.appendChild(heroWrap);
