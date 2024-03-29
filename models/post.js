var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;

var Document = require('./document');
var Comment = require('./comment');

// Declare Schema
var postSchema = Document.schema.extend({
    categories: {
        type: [ String ],
        default: [],
        required: true
    },
    comments: [ ObjectId ] // FIXME: Is this the right syntax?
});

// Declare Model
var Post = module.exports = mongoose.model('Post', postSchema);
