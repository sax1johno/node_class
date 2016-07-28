var express = require('express'),
    app = express(),
    config = require("./config.json");

app.set("views", "./views");

app.use(express.static('public'));
app.use(function(req, res, next) {
    console.log("A request was made");
    next();
});

app.get("/js/main.js", function(req, res) {
    res.send("Never gonna happen");
});

app.get("/", function(req, res) {
    var name = req.param("name")
    var myHomePage = [
        "<html>",
            "<head>",
            "</head>",
            "<body>",
                "<h1>Hello, " + name + "</h1>",
                "<h4>The page you were looking for was not found</h4>",
            "</body>",
        "</html>"
    ].join('\n');
    res.status(404).send(myHomePage);
});

app.get("/render", function(req, res) {
    var name = req.param("name");
    var id = req.param("id");
    res.render("home.jade", {
        "message": "Hi there",
        "name": name,
        "id": id
    });
});

var authenticated = function(req, res, next) {
        if (req.param('user') !== undefined) {
            next();
        } else {
            res.status(403).send("You must be logged in");
        }
    };

var authorized = function(req, res, next) {
        if (req.param('user') !== config.authUser) {
            res.status(403).send("You must be an admin user");
        } else {
            next();
        }
    }

app.get("/authenticated",
    authenticated,
    authorized,
    function(req, res) {
        res.send("This should only show when you have an account"); 
    });

app.get("/authenticated2", 
    authenticated,
    authorized,
    function(req, res) {
        res.send("Allowed in here");
    }
    )
// app.put("/users", function(req, res) {
    
// });

// app.delete("/users", function(req, res) {
    
// });

// API method for my awesome new application
app.get("/users", function(req, res) {
    var users = [
        {
            name: "John",
            age: 100,
            occupation: "Underwater Basket Weaver"
        },
        {
            name: "Bob"
        }
        ];
    res.send(users)
})

app.get("/article/:id/:name", function(req, res) {
    var id = req.params.id;
    var name = req.params.name;
    res.send("Id = " + id + " and name is " + name);
});

app.post("/", function(req, res) {
    res.send("Hello world");
});

console.log("Running server on port", process.env.PORT);
app.listen(process.env.PORT);