const config = require(__basedir + "/config.json");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const appPort = config.express.port;
const indexRouter = require(__basedir + "/app/routes/index");
const apiRouter = require(__basedir + "/app/routes/api");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/styles", express.static(__basedir + "/public/assets/styles"));
app.use("/scripts", express.static(__basedir + "/public/assets/scripts"));

app.set("views", __basedir + "/app/views/pages");
app.set("view engine", "pug");

app.use("/", indexRouter);
app.use("/api", apiRouter);

app.listen(appPort, function () {
  console.log("Запущен сервер express на порту", appPort);
});

process.on("SIGINT", () => {
  // db.close();
  console.log("\nСервер остановлен");
  process.exit();
});
