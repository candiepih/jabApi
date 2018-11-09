const modules = require("./modulesInfo.js"),
      fs = modules.fs,
      request = modules.request,
      events = modules.events;

let myEmitter = new events.EventEmitter();
const url = "https://newsapi.org/v2/top-headlines?sources=bbc-sport&apiKey=2fa7226126e34bad8730285114bc57bd";
let myRequest = myEmitter.on("request", (value)=>{
	request.get(url, (error, response, body)=>{
		if (error) {
			throw error;
		}else {
		   value.json(body);
		}
	});
  });

module.exports = {
	myRequest: myRequest
}

