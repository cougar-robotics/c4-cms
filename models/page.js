var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;
var _ = require('lodash');

var regexps = require('../lib/regexps');

var Document = require('./document');

// Declare Schema
var pageSchema = Document.schema.extend({
    header_image: { type: String, match: regexps.web_url }
});

// Declare Model
var Page = module.exports = mongoose.model('Page', pageSchema);
