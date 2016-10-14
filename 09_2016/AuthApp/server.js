var express = require('express'),
    path = require('path'),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    flash = require('express-flash'),
    passwordFile = require('./donotlook.json'),
    facebookStrategy = require('passport-facebook');
    
passport.use(new LocalStrategy(
    function(username, password, done) {
        // if (username !== 'admin') {
        if (!passwordFile.hasOwnProperty(username)) {
            // done takes (err, authPassed, message);
            done("You've logged in too many times. Bad you!", false, "Invalid username");
        } else if (passwordFile[username] !== password) {
            done(null, false, 'Invalid Password');
        } else {
            done(null, true);
        }
    }
));

// passport.use(new FacebookStrategy());

passport.serializeUser(function(user, done) {
    // done has an error as the first param, and the user string as the second.
    done(null, JSON.stringify(user));
});

passport.deserializeUser(function(user, done) {
    var u = JSON.parse(user);
    done(null, u);
});

app.set('views', path.join(__dirname, "views"));

// Parse bodies that have the type x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({ "secret": "supersecret"}))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
    console.log(req.url);
    next();
});

app.get("/", function(req, res) {
    // res.send("Home page");
    res.render('index.ejs');
});

app.get("/login", function(req, res) {
    req.session.test = "hi there";
    res.render('login.ejs');
});

app.post("/processLogin", passport.authenticate('local', {
    successRedirect: "/protected",
    failureRedirect: "/login",
    failureFlash: true
}));

// app.post("/processFacebookLogin", passport.authenticate('facebook'));

// stuff we want express to handle.
// app.post("/processLogin", function(req, res) {
//     var username = req.param('username');
//     var password = req.param('password');
//     console.log("session variable test = ", req.session.test);
//     console.log("Username is ", username);
//     console.log("Password is ", password);
//     if (username == 'admin') {
//         if (password == 'secret') {
//             req.session.loggedIn = true;
//             res.send("Success!! User logged in");
//         } else {
//             res.send("Invalid Password");
//         }
//     } else {
//         res.send("Invalid Username");
//     }
// });

app.get("/protected",
    auth,
    function(req, res) {
        res.send("Successfully hit protected route"); 
    }
);

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect('/');
});

function auth(req, res, next) {
    // req.user will only exist IF passport auth is successful.
    if (req.user) {
        next();
    } else {
        res.status(403).send("You are not authorized. Please log in");
    }
};

app.listen(process.env.PORT);