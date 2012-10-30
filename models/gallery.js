var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;

var Document = require('./document');

// Declare Schema
var gallerySchema = Document.schema.extend({
    media: { type: [ ObjectId ], default: [] }
});


//TODO: override slugify

// Declare Model
var Gallery = module.exports = mongoose.model('Gallery', gallerySchema);
