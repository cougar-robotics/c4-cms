var resourceful = require('resourceful');

var Page = module.exports = resourceful.define('page', function() {
    this.use('couchdb', {
        database: 'testdb'
    });

    this.string('title');
});
