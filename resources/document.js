// Common schema properties shared between the various documents.
var config = require('../config');

exports.schema = function(doc) {
    doc.use('couchdb', {
        uri: config.get('database:host')
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
        doc.id = doc.id || doc.title.replace(/ /, '-');
    });
};
