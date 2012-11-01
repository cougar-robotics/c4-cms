var nodeValidator = require('validator'),
	check 		  = nodeValidator.check;

// Validator Function
// =================
// 
// Takes an error message, a field, and any parameters. Returns
// a mongoose-valid validator arrayk.
// Usage: 
//     Schema.path('abc')
//         .validate(validator('minimum length '+minlen+' characters', 'len', minlen));
module.exports = function(msg, field, a, b, c) {
    return [ 
        function(val) {
            if(isEmpty(val)) return true;
            var response = true;

            try {
                check(val)[field](a,b,c);
            } catch(err) {
                response = false;
            }

            return response;
        }, msg
    ];
}

function isEmpty(val){
	return (typeof val === 'undefined' || val === '' || val === null || (typeof obj === 'object' && Object.keys(obj).length === 0));
}
