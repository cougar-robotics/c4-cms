var should = require('chai').Should();
var _ = require('lodash');
var phony = require('phony').make_phony();
var resourceful = require('resourceful');

var document = require('../../resources/document');
var helpers = require('../helpers');

describe('Document', function() {
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
            ,   content: phony.lorem_paragraphs(5)
                //TODO: test document-author relationship
            ,   author: null
            ,   publish_status: 'published'
        };
        doc = this.topic = Document.new(this.valid_attrs);
    });

    it('creates a new doc given valid attributes', function() {
        doc.should.be.a('object');
        doc.validate().valid.should.be.true;
    });

    describe('validations', function() {
        helpers.requires([
            'title' 
            //,   'author'
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
    });
});

