var express = require("express");
var app = express();

app.set("view engine", "vash");

var controllers = require("./controllers");
controllers.init(app)

app.use(express.static(__dirname + "/public"));

var server = app.listen("3000", function () {
    console.log("listening to port %d", server.address().port);
})

