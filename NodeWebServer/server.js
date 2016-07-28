var http = require("http");


var server = http.createServer(function(request, response) {
    if (request.url == "/home" && request.method == "get") {
        response.write("Home route called");
    } else if (request.url == "/") {
        response.write("Index called");
    }
    response.write("This is the end of the response");
    response.end();
});

console.log("Listening on port", process.env.PORT);
server.listen(process.env.PORT);