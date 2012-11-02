var should = require('chai').Should();
var _ = require('lodash');

var Document = require('../../models/document');
var helpers = require('../helpers');
var Factory = require('../helpers/factories');

describe('Document model', function() {
    var doc;

    beforeEach(function(done) {
        var that = this;
        Factory.build('document', function(_doc) { 
            doc = that.topic = _doc;
            done();
        });
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

    it('includes a default publish_status' , function() {
        var doc = new Document;
        doc.should.have.property('publish_status');
    });

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
            var orig = this.topic;
            orig.save(function(err) { 
                should.not.exist(err);
                Factory.build('document', { slug: orig.slug }, function(dupe) { 
                    dupe.save(function(err) { 
                        should.exist(err);
                        err.err.should.include('duplicate key error');
                        dupe.remove(done);
                    });
                });
            });
        });

        it('is unique even if the title is not', function(done) { 
            var orig = this.topic;

            var orig = this.topic;
            Factory.build('document', { title: orig.title }, function(dupe) { 
                orig.save(function(err) { 
                    should.not.exist(err);
                    dupe.save(function(err) { 
                        should.not.exist(err);
                        dupe.slug.should.not.equal(orig.slug);
                        dupe.remove(done);
                    });
                });
            });
        });
    });
});
