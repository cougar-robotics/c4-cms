var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');
var validator = require('../lib/validator');

var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;

var timestamps = require('../lib/timestamps');

var minlen = require('../config').get('comment:min_len');

// Declare Schema
var commentSchema = new Schema({
    author: String,
    body: {
        type: String,
        validate: validator('minimum length '+minlen+' characters', 'len', minlen),
        required: true
    },
    post: ObjectId
});

commentSchema.plugin(timestamps, { useVirtual: false });

// Declare Model
var Comment = module.exports = mongoose.model('Comment', commentSchema);
