var should = require('chai').Should();
var _ = require('lodash');
var phony = require('phony').make_phony();
var resourceful = require('resourceful');

var document = require('../../resources/document');
var helpers = require('../helpers');

describe('Document resource', function() {
    var Document;
    var doc;

    before(function() {
        Document = resourceful.define('document', function() {
            document.schema(this);
        });
    });

    beforeEach(function() {
        this.valid_attrs = {
                id: phony.title().replace(/ /, '-')
            ,   title: phony.title()
            ,   content: phony.lorem_paragraphs(4)
            ,   author: null
            ,   publish_status: 'published'
        };
        doc = this.topic = Document.new(this.valid_attrs);
    });

    it('creates a new doc given valid attributes', function() {
        doc.should.be.a('object');
        doc.validate().valid.should.be.true;
    });

    it('correctly saves to the database', function(done) {
        doc.save(function(err, saved_doc) {
            should.not.exist(err);
            saved_doc.should.equal(doc);
            Document.get(doc.id, function(err, retrieved_doc) {
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
            var topic = this.topic;
            topic.save(function(err) {
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
            topic.id = undefined;
            topic.save(function(err) {
                should.not.exist(err);
                topic.should.have.property('id', topic.title.replace(/ /, '-'));
                done();
            });
        });

        it('correctly creates slugs when given titles with odd characters');
        it('creates a unique id even if the slug is not unique');
    });
});

