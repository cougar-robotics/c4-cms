var resourceful = require('resourceful');
var document = require('./document');
var _ = require('lodash');

var Post = module.exports = resourceful.define('post', function() {
    document.schema(this);

    this.array('categories', {
            required: true
        ,   set: function(val) { return val || []; }
    })
});
