var express = require('express'),
    app = express(),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),
    bodyParser = require('body-parser');
    
app.use(express.static('public'));
app.use(cookieParser());
app.use(expressSession({secret: "23lnwn23lk2lj1oij20019203jf"}));
app.use(bodyParser());
app.set("views", path.join(__dirname, 'views'));

passport.use(
    new LocalStrategy(
        function(username, password, done) {
            if (username == "admin" && password == "secret") {
                // done(error, loginSuccess, [message]);
                done(null, true);
            } else {
                // Username and password didn't authenticate properly.
                done(null, false, "Invalid Username or Password");
            }
        })
    );
    
    
passport.serializeUser(function(user, done) {
    done(null, JSON.stringify(user));
});

passport.deserializeUser(function(userString, done) {
    done(null, JSON.parse(userString));
});

app.use(passport.initialize());


app.get('/private',
    function(req, res, next) {
        if (req.user) {
            next();
        } else {
            res.redirect('/login');
        }
    }, function(req, res) {
        res.render("private.ejs");
});

app.get('/admin',
    function(req, res, next) {
        if (req.user && req.user.role == 'admin'){ 
            next();
        } else {
            res.redirect('/login');
        }
    },
    function(req, res) {
//   res.send("You've made it to the admin section"); 
    res.render('admin.ejs');
});

app.get('/', 
    function(req, res, next) {
        if (req.session.count) {
            req.session.count++;
        } else {
            req.session.count = 1;
        }
        next();
    },
    function(req, res) {
    res.render("index.ejs", {
        "counter": req.session.count
    });
    console.log("You've visited the site ", req.session.count, "times");
});

app.get('/login', function(req, res) {
    res.render('login.ejs'); 
});

app.post('/login', passport.authenticate('local', {
        'successRedirect': '/admin',
        'failureRedirect': '/login'
    })
    // // do something with the data they sent.
    // // Something with the session.
    // var username = req.body.username;
    // var password = req.body.password;
    // if (username == 'admin' && password == 'secret') {
    //     req.session.user = "admin";
    //     res.redirect("/admin");
    // } else {
    //     res.render('login.ejs', {
    //         "error": "Invalid username or password"
    //     });
    // }
)

app.get('/logout', function(req, res) {
    delete req.session.user;
    res.redirect('/login');
});

app.listen(process.env.PORT);