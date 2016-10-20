var http = require('http');

var server = http.createServer(function(request, response) {
    response.write("<html><head></head><body>");
    console.log(request.url);
    if (request.url == "/home" && request.method == "GET") {
        response.write("<h1>Hello, there</h1>");
        response.write("<p>You're on the home page</p>");
        response.write("</body></html>");
        
    } else if(request.url == "/login" && request.method == "GET") {
        response.write("<h1>I should render the login page</h1>");
        response.write("</body></html>");
    } else {
        response.writeHead(404);
        // response.write("<h1>Error: 404 page not found</h1>");
    }
    console.log("the url was", request.url);
    console.log("The method was", request.method);
    response.end();    
});

server.listen(process.env.PORT);
console.log("Listening on port", process.env.PORT);