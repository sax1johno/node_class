var express = require('express'),
    app = express();

// User makes a request, which is available on the request object.
// You can respond using the "response" object.
// Here, if the user calls the "/" route, we can process a response.
app.get("/", function(request, response) {
     response.send("Hello web");
});

app.listen(process.env.PORT);