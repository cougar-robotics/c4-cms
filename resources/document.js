// Common schema properties shared between the various documents.

exports.schema = function(doc) {
    doc.use('couchdb', {
        database: 'testdb'
    });

    doc.string('title', {
        required: true
    });

    doc.string('content', {
        required: true
    });

    doc.string('publish_status', {
            required: true
        ,   enum: ['in_review', 'published', 'draft', 'trash']
        ,   set: function(val) { return val || 'draft' }
    });

    doc.timestamps();
};
