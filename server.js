'use strict';

// Init modules
var express = require('express');
var app = express();

// Parse request headers, respond with IP, operating system, and language
app.get("/", function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let headers = req.headers;
  let ip = headers['x-forwarded-for'].substr(0, headers['x-forwarded-for'].indexOf(",")) || req.connection.remoteAddress;
  let language = headers['accept-language'];
  let software = headers['user-agent'];
  software = software.substr(software.indexOf("(") + 1, software.length);
  software = software.substr(0, software.indexOf(")"))
  language = language.substr(0, language.indexOf(","));
  res.end(JSON.stringify({ip: ip, language: language, software: software}));
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});