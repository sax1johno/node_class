var express = require('express'),
    app = express();

app.get('/users', 
    // A callback that fires when the user visits our site
    function(req, res, next) {
        mongo.find({"username": req.query.username}, 
            function(err, results) {
                res.send(results);
        });
});

var arr = ["a", "b", "c", "d", "e"];
var joinedCharacters = "";
for (var i = 0; i < arr.length; i++) {
    joinedCharacters = joinedCharacters + arr[i];
}
console.log(joinedCharacters); // Could be empty, could be a long wait.  Not sure which.

DBCall1(query, function(err, results) {
    DbCall2(query2, function(err, results) {
        DbCall3(query3, function(err, results3) {
            
        })
    })
})

DbCall1(query)
    .then(DBCall2(query2))
    .then(DBCall3(query3))

app.listen(process.env.PORT);
// console.log("This should fire first");
// var done = false;
// setTimeout(function() {
//     while(!done) {
//     }
//     console.log("This should fire next");
// }, 0);

// console.log("This should fire last.");
// done = true;

// // Callback pattern for ASync Code
// doSomethingForALongTime(param1, param2, function(results) {
//     console.log("Guarantee that doSomethingForALongTime has completed");
// });