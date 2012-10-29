var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;
var _ = require('lodash');

var Document = require('./document');

// Declare Schema
var postSchema = Document.schema.extend({
    categories: {
        type: [ String ],
        default: [],
        required: true
    },
    comments: [{
        author: String,
        body: String,
        created: { type: Date, default: Date.now },
        modified: { type: Date, default: Date.now }
    }]
});

// Declare Model
var Post = module.exports = mongoose.model('Post', postSchema);
