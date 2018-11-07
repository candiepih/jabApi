const events = require("events"),
      request = require("request"),
      http = require("http"),
      express = require("express"),
      fs = require("fs"),
      util = require("util");
module.exports = {
	events: events,
	fs: fs,
	request: request,
	http: http,
	express: express,
	util: util
}