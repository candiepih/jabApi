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
			/*value.send(body);*/
			let json = JSON.parse(body);
			value.render("news-api-info", {info: json});
			fs.writeFile("api-headlines.txt", body, (err, data)=>{
				if (err) {
					throw err;
				}else{
				    console.log("file written successfully");
				}
			});
		}
	});
  })

module.exports = {
	myRequest: myRequest
}

