const modules = require("./modulesInfo.js"),
      Request = require("./newsApi.js"),
      http = modules.http,
      express = modules.express,
      events = modules.events,
      fs = modules.fs,
      util = modules.util,
      cors = modules.cors,
      request = modules.request;
console.log(cors);
let myRequest = Request.myRequest


var app = express();
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);

app.use(cors());
app.use("/style", express.static("style"));
app.use("/images", express.static("images"));
app.use("/inc", express.static("inc"));

app.listen(app.get("port"), ()=>{
  app.get("/getnews", (req, res)=>{
    	myRequest.emit("request", res);
    });
});
console.log("We are listening to port "+app.get("port"));