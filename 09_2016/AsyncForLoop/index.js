// console.log("Synchronous for loop");
// for (var i = 0; i < 10; i++) {
//     console.log("i is ", i);
// }
var _ = require('underscore'),
    express = require('express');

// this will throw an error if _ is not available
// OR, will do nothing but not fail.
_.after(1, function() {
    console.log("blah");
})

var forEach = function(startValue, endValue, callback) {
    // Responds to a user.
    // How can I respond to the user While encoding the image?
    for(var i = startValue; i < endValue; i++) {
        console.log("Start encoding image", i);
        setTimeout(function(){ 
            callback(i);
        }, 0);
    }
    console.log("Ok image complete now!")
};

// forEach(0, 10, function(i) {
//     // A call to another website
//     // Image encoding
//     for (var j = 0; j < 10; j++) {
//         console.log("encoding image", i);
//     }
//     console.log("image encoded competely");
// });

module.exports = forEach;