var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;
var _ = require('lodash');

var Document = require('./document');

// Declare Schema
var pageSchema = Document.schema.extend({
});

// Virtuals

// Validators

// Declare Model
var Page = module.exports = mongoose.model('Page', pageSchema);
