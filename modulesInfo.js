const events = require("events"),
      request = require("request"),
      http = require("http"),
      express = require("express"),
      fs = require("fs"),
      cors = require("cors"),
      bodyParser = require("body-parser"),
      util = require("util");
module.exports = {
	events: events,
	fs: fs,
	request: request,
	http: http,
	cors: cors,
	bodyParser: bodyParser,
	express: express,
	util: util
}
