'use strict';

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var compression = require("compression");
var morgan = require("morgan");
var PORT = Number(process.env.PORT || 3000);
var Counters = require("./lib/Counters");

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());

// We wouldn't be enabling cross origin in production, but we are doing so
// so we can have a front end server and backend server running at the same
// time for development purposes
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

function sendFile(name) {
  return function (req, res) {
    res.sendFile(__dirname + "/dist/" + name);
  };
}

app.get("/", sendFile("index.html"));
app.get("/counterList.html", sendFile("counterList.html"));
app.get("/counterList.css", sendFile("counterList.css"));
app.get("/app.html", sendFile("app.html"));
app.get("/app.css", sendFile("app.css"));
app.get("/libs/ng2-toastr.js", sendFile("/libs/ng2-toastr.js"));
app.get("/libs/ng2-toastr.min.css", sendFile("./libs/ng2-toastr.min.css"));
app.get("/libs/system.js", sendFile("/libs/system.js"));
app.get("/bundle.js", sendFile("bundle.js"));
app.get("/libs/font-awesome.css", sendFile("/libs/font-awesome.css"));
app.get("/fonts/fontawesome-webfont.woff2", sendFile("/fonts/fontawesome-webfont.woff2"));
app.get("/fonts/fontawesome-webfont.woff", sendFile("/fonts/fontawesome-webfont.woff"));
app.get("/fonts/fontawesome-webfont.ttf", sendFile("/fonts/fontawesome-webfont.ttf"));
app.get("/fonts/fontawesome-webfont.svg", sendFile("/fonts/fontawesome-webfont.svg"));
app.get("/fonts/fontawesome-webfont.eot", sendFile("/fonts/fontawesome-webfont.eot"));

// [json] GET /api/v1/counters
// => [
// =>   {id: "asdf", title: "boop",  count: 4},
// =>   {id: "zxcv", title: "steve", count: 3}
// => ]
app.get("/api/v1/counters", function (req, res) {
  res.json(Counters.all());
});

// [json] POST {title: "bob"} /api/v1/counters
// => [
// =>   {id: "asdf", title: "boop",  count: 4},
// =>   {id: "zxcv", title: "steve", count: 3},
// =>   {id: "qwer", title: "bob",   count: 0}
// => ]
app.post("/api/v1/counter", function (req, res) {
  res.json(Counters.create(req.body.title));
});

// [json] DELETE {id: "asdf"} /api/v1/counter
// => [
// =>   {id: "zxcv", title: "steve", count: 3},
// =>   {id: "qwer", title: "bob",   count: 0}
// => ]
app.delete("/api/v1/counter", function (req, res) {
  res.json(Counters.delete(req.body.id));
});

// [json] POST {id: "qwer"} /api/v1/counter/inc
// => [
// =>   {id: "zxcv", title: "steve", count: 3},
// =>   {id: "qwer", title: "bob",   count: 1}
// => ]
app.post("/api/v1/counter/inc", function (req, res) {
  res.json(Counters.inc(req.body.id));
});

// [json] POST {id: "zxcv"} /api/v1/counter/dec
// => [
// =>   {id: "zxcv", title: "steve", count: 2},
// =>   {id: "qwer", title: "bob",   count: 1}
// => ]
app.post("/api/v1/counter/dec", function (req, res) {
  res.json(Counters.dec(req.body.id));
});

app.get("*", sendFile("index.html"));
app.head("*", sendFile("index.html"));

app.listen(PORT, console.log.bind(null, "PORT: " + PORT));
