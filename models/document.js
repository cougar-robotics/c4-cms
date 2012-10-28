var mongoose = require('mongoose');
var timestamps = require('../lib/timestamps')

var documentSchema = new mongoose.Schema({
    title: { type: String, trim: true },
    slug: String,
    author: String,
    content: { type: String, trim: true },
});

documentSchema.plugin(timestamps, { useVirtual: false });

module.exports = mongoose.model('Document', documentSchema);
