var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');
var _ = require('lodash');
var validator = require('../lib/validator');

var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;

var Document = require('./document');

// Declare Schema
var pageSchema = Document.schema.extend({
    header_image: {
        type: String,
        validate: validator('url format of image', 'isUrl')
    }
});

// Declare Model
var Page = module.exports = mongoose.model('Page', pageSchema);
