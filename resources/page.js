var resourceful = require('resourceful');
var document = require('./document');
var _ = require('lodash');

var Page = module.exports = resourceful.define('page', function() {
    document.schema(this);
});
