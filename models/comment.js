var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;

var timestamps = require('../lib/timestamps');

// Declare Schema
var commentSchema = new Schema({
    author: String,
    body: String,
    post: ObjectId
});

documentSchema.plugin(timestamps, { useVirtual: false });

// Declare Model
var Comment = module.exports = mongoose.model('Comment', commentSchema);
