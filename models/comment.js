var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;

var timestamps = require('../lib/timestamps');

// Declare Schema
var commentSchema = new Schema({
    author: String,
    body: {
        type: String,
        validate: min_length(25),
        required: true
    },
    post: ObjectId
});

commentSchema.plugin(timestamps, { useVirtual: false });

function min_length(len) {
    return [ function(str, respond) { 
            respond(str && str.length >= len);
        }, 'min_length' ];
}

// Declare Model
var Comment = module.exports = mongoose.model('Comment', commentSchema);
