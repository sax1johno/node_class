var http = require('http');
var chance = require('chance');
var random = require('./randomStuff');
var testUtils = require("./09_2016/TestUtils");

var chanceGenerator = chance();

console.log(chanceGenerator.dollar());

console.log(random.age());