var mongoose = require('mongoose');
var timestamps = require('../lib/timestamps');
var slugify = require('../lib/slugify');

var documentSchema = new mongoose.Schema({
    title: { type: String, trim: true, required: true },
    slug: String,
    author: String,
    content: { type: String, trim: true, required: true },
    publish_status: {
        type: String,
        enum: ['published','draft','in_review','trash'],
        default: 'draft'
    }
});

documentSchema.plugin(timestamps, { useVirtual: false });
documentSchema.plugin(slugify);

module.exports = mongoose.model('Document', documentSchema);
