var expressAppGenerator = require("express");
var app = expressAppGenerator();
var util = require('util');

var superUtil = require("./MySuperUtility");

app.get("/", function(request, response) {
    console.log(superUtil.myMessage);
    console.log(request.param("name"));
    // request.query("name");
    // request.body("name");
    response.send(request.param("name") + " need to be punched in the throat.");
});

app.listen(process.env.PORT); // listens on the port that c9 has made available to us.