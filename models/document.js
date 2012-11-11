var mongoose = require('mongoose');
var _ = require('lodash');
var timestamps = require('../lib/timestamps');
var slugify = require('../lib/slugify');
var merge = require('../lib/merge');
var ObjectId = mongoose.SchemaTypes.ObjectId;

var documentSchema = new mongoose.Schema({
    title: { type: String, trim: true, required: true },
    slug: { type: String, unique: true },
    author: { type: ObjectId, ref: 'User' },
    content: { type: String, trim: true, required: true },
    publish_status: {
        type: String,
        enum: ['published','draft','in_review','trash'],
        default: 'draft'
    }
});

documentSchema.plugin(timestamps, { useVirtual: false });
documentSchema.plugin(slugify);
documentSchema.plugin(merge);

module.exports = mongoose.model('Document', documentSchema);
