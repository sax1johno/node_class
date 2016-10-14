var util = require('util');

var complex = { 
    "binary": {
        "machine": {
            "assembly": {
                "low-level": {
                    "2gen": {
                        "3gen": "Hi!"
                    }
                }
            }
        }
    }
}

console.log(util.inspect(complex, {depth: 5}));
console.log("After breakpoint");

for (var i = 0; i < 20; i++) {
    console.log(i);
}