const events = require("events"),
      request = require("request"),
      http = require("http"),
      express = require("express"),
      fs = require("fs"),
      cors = require("cors"),
      util = require("util");
module.exports = {
	events: events,
	fs: fs,
	request: request,
	http: http,
	cors: cors,
	express: express,
	util: util
}