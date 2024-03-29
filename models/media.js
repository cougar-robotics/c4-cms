var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');
var validator = require('../lib/validator');
var uuid = require('node-uuid');
var _ = require('lodash');
var sanitize = require('validator').sanitize;

var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;

var Document = require('./document');

// Declare Schema
var mediaSchema = Document.schema.extend({
    kind: { 
        type: String,
        enum: [ 'photo', 'video', 'audio' ],
        required: true
    },
    content: {
        type: String,
        validate: validator('url format', 'isUrl')
    },
    caption: {
        type: String,
        set: function(val) { return sanitize(val).xss(); }
    },
    thumbnail: String,
    format: String
});

// Override the slugify method
mediaSchema.methods.slugify = function(str) {
    var n = uuid.v4();
    return n.substr(n.length - 6);
};

// Declare Model
var Media = module.exports = mongoose.model('Media', mediaSchema);
