const express = require("express");
const router = express.Router();

router.get("/", function (_req, res) {
  res.type("html");
  res.render("index", { title: "Wii U Media Center" });
});

router.get("/tv", function (_req, res) {
  res.type("html");
  res.render("channels", { title: "TV Channels" });
});

router.get("/movies", function (_req, res) {
  res.type("html");
  res.render("movies", { title: "Movies" });
});

router.get("/movie/title/:title", function (req, res) {
  let title = decodeURI(req.params.title);
  res.type("html");
  res.render("movie", { title: title });
});

router.get("/serials", function (_req, res) {
  res.type("html");
  res.render("serials", { title: "Serials" });
});

router.get("/serial/title/:title", function (req, res) {
  let title = decodeURI(req.params.title);
  res.type("html");
  res.render("serial", { title: title });
});

router.get("/serial/title/:title/:season", function (req, res) {
  let title = decodeURI(req.params.title) + " • " + req.params.season;
  res.type("html");
  res.render("season", { title: title });
});

module.exports = router;