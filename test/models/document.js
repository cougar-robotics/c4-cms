var should = require('chai').Should();
var _ = require('lodash');
var phony = require('phony').make_phony();

var Document = require('../../models/document');
var helpers = require('../helpers');

describe('Document model', function() {
    var doc;

    before(function() {
        this.create_valid_attrs = function() {
            return {
                title: phony.title()
            ,   content: phony.lorem_paragraphs(4)
            ,   author: null
            ,   publish_status: 'published'
            };
        };
    });

    beforeEach(function() {
        this.valid_attrs = this.create_valid_attrs();
        doc = this.topic = new Document(this.valid_attrs);
    });

    helpers.database_setup_teardown();

    afterEach(helpers.remove_topic_document());

    it('creates a new doc given valid attributes', function(done) {
        doc.should.be.a('object');
        doc.validate(done);
    });

    it('saves to the database', function(done) {
        doc.save(function(err, saved_doc) {
            should.not.exist(err);
            saved_doc.should.equal(doc);
            Document.findById(saved_doc._id, function(err, retrieved_doc) {
                should.not.exist(err);
                should.exist(retrieved_doc);
                retrieved_doc.id.should.equal(doc.id);
                done();
            });
        });
    });

    it('supports revisions');
    it('is aware of which users can edit it');

    helpers.requires('title');
    it('sanitizes the title of anything malicious');

    helpers.requires('content');
    it('sanitizes the content if the user is not an admin');
    it('trims whitespace off the content');

    helpers.enum('publish_status', 
        [ 'published' , 'draft' , 'in_review' , 'trash' ], 
        [ 'poor_quality' , 'dratt' , 'trashy' ]
    );

    it('requires timestamps', function(done) {
        this.topic.save(function(err, topic) {
            should.not.exist(err);
            topic.should.have.property('created').that.is.a('date');
            topic.should.have.property('modified').that.is.a('date');
            done();
        });
    });

    it('allows for custom CSS and JS');

    helpers.defaults(Document, { 'publish_status': 'draft' });

    describe('author', function() {
        it('can retrieve its author');
        it('requires an author');
    });

    describe('slug', function() { 
        it('is generated automatically if id is missing', function(done) {
            var that = this;
            this.topic.save(function(err, topic) {
                should.not.exist(err);
                topic.should.have.property('slug');
                done();
            });
        });

        it('doesn\'t have any odd characters', function(done) { 
            var that = this;
            this.topic.title = '♦☭☭¶http://.org:8080//\\3@#^#@$%^s/ro'
            this.topic.save(function(err, topic) { 
                should.not.exist(err);
                topic.should.have.property('slug')
                    .and.match(/^[a-zA-Z0-9 -_+]+$/)
                    .and.not.contain('/');
                done();
            });
        });

        it('is unique', function(done) {
            var original = this.topic;
            var duplicate = new Document(this.create_valid_attrs());

            original.save(function(err) { 
                should.not.exist(err);
                duplicate.slug = original.slug;
                duplicate.save(function(err) { 
                    should.exist(err);
                    err.err.should.include('duplicate key error');
                    duplicate.remove(done);
                });
            });
        });

        it('is unique even if the title is not', function(done) { 
            var original = this.topic;
            var duplicate = new Document(this.create_valid_attrs());

            original.save(function(err) { 
                should.not.exist(err);
                duplicate.title = original.title;
                duplicate.save(function(err) { 
                    should.not.exist(err);
                    duplicate.slug.should.not.equal(original.slug);
                    duplicate.remove(done);
                });
            });
        });
    });
});
