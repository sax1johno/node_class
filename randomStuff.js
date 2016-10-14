var chance = require('chance');

var chanceGenerator = chance();

var getMyAge = function() {
    return chanceGenerator.age();
}

function myFunc() {
    var x = 5;
    return {
        "x": x
    }
}

module.exports = {
    age: getMyAge
}