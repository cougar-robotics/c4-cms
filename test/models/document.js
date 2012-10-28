var should = require('chai').Should();
var _ = require('lodash');
var phony = require('phony').make_phony();

var document = require('../../models/document');
var helpers = require('../helpers');

describe('Document resource', function() {
    var Document;
    var doc;

    before(function() {
        Document = resourceful.define('document', function() {
            document.schema(this);
        });
        this.create_valid_attrs = function() {
            return {
                    _id: phony.title().replace(/ /, '-')
                ,   title: phony.title()
                ,   content: phony.lorem_paragraphs(4)
                ,   author: null
                ,   publish_status: 'published'
            };
        };
    });

    beforeEach(function() {
        this.valid_attrs = this.create_valid_attrs();
        doc = this.topic = Document.new(this.valid_attrs);
    });

    afterEach(function(done) {
        doc.destroy(function(err) {
            if (!err || err.reason === 'not_found') { done(); }
            else { done(err); }
        });
    });

    it('creates a new doc given valid attributes', function() {
        doc.should.be.a('object');
        doc.validate().valid.should.be.true;
    });

    it('correctly saves to the database', function(done) {
        doc.save(function(err, saved_doc) {
            should.not.exist(err);
            saved_doc.should.equal(doc);
            Document.get(doc._id, function(err, retrieved_doc) {
                should.not.exist(err);
                should.exist(retrieved_doc);
                retrieved_doc.id.should.equal(doc.id);
                done();
            });
        });
    });

    describe('validations', function() {
        helpers.requires([
            'title' 
        ,   'content'
        ]);

        helpers.enum('publish_status', [
            'in_review'
        ,   'published'
        ,   'draft'
        ,   'trash'
        ], [
            'poor_quality'
        ,   'dratt'
        ,   'trashy'
        ]);


        it('requires an author');

        it('requires timestamps', function(done) {
            this.topic.save(function(err, topic) {
                should.not.exist(err);
                topic.should.have.property('ctime').with.a('number');
                topic.should.have.property('mtime').with.a('number');
                done();
            });
        });

        it('allows for custom CSS and JS');
        it('supports revisions');
        it('is aware of which users can edit it');
    });

    describe('defaults', function() {
        helpers.defaults({
            'publish_status': 'draft'
        });

        it('generates a slug automatically if id is missing', function(done) {
            var topic = this.topic;
            topic._id = undefined;
            topic.save(function(err, topic) {
                should.not.exist(err);
                topic.should.have.property('_id', topic.title.toLowerCase().replace(/ /, '-'));
                done();
            });
        });

        it('correctly creates slugs when given titles with odd characters');
        it('creates a unique id even if the slug is not unique');
    });
});

