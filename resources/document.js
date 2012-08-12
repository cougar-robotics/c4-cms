// Common schema properties shared between the various documents.
var config = require('../config');

exports.schema = function(doc) {
    doc.use('couchdb', {
        host: config.get('database:host')
    ,   port: config.get('database:port')
    ,   database: config.get('database:name')
    });

    doc.string('title', {
        required: true
    });

    doc.string('content', {
        required: true
    });

    doc.string('publish_status', {
            required: true
        ,   "enum": ['in_review', 'published', 'draft', 'trash']
        ,   set: function(val) { return val || 'draft'; }
    });

    doc.timestamps();

    doc.before('save', function(doc) {
        if (!doc._id) {
            doc._id = doc.title.toLowerCase().replace(/ /, '-');
        }
        return true;
    });
};
