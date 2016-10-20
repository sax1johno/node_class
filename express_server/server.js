var express = require('express'); // Express library is a generator of apps.
var app = express(); // Generate an app.
var bodyparser = require('body-parser');


app.use(function(req, res, next) {
    console.log(req.url);
    if (req.ip !== '127.0.0.1') {
        res.status(403);
    } else {
        next();
    }
});

app.use(bodyparser.urlencoded({ extended: false }));

app.use(express.static('public'));
// app.use(bodyparser.json());

app.post("/login", function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    res.send("This is the login page", username);
});

app.get("/api", function(req, res) {
    var myObject = {
        "name": "John",
        "class": "nodejs",
        "date": "10/19"
    };
    res.send(myObject);
});

app.get("/restricted", function(req, res, next) {
        var access_key = req.query.access_key;
        if (access_key != "abc123") {
            res.send(403);
        } else {
            next();
        }
    }, function(req, res, next) {
        var favoriteAnimal = req.query.favorite_animal;
        if (favoriteAnimal !== "narwhal") {
            res.send(403);
        } else {
            next();
        }
    },
    function(req, res) {
        res.send("You made it to the restricted area!")
    });
// app.post();
// app.put

app.listen(process.env.PORT);