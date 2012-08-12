var resourceful = require('resourceful');
var document = require('./document');
var config = require('../config');
var _ = require('lodash');

var Page = module.exports = resourceful.define('page', function() {
    document.schema(this);
    this.child('page');
});
