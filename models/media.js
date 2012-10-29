var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');
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
    caption: String,
    thumbnail: String
});

delete mediaSchema.header_image;

// Declare Model
var Media = module.exports = mongoose.model('Media', mediaSchema);
