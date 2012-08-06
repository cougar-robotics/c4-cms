var should = require('should');
var _ = require('lodash');
var Faker = require('Faker');
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
                id: Faker.Lorem.sentence(10).replace(/ /, '-')
            ,   title: Faker.Lorem.sentence(15)
            ,   content: Faker.Lorem.paragraphs(5)
                //TODO: test document-author relationship
            ,   author: null
            ,   publish_status: Faker.Helpers.randomize([
                    'published', 
                    'in_review', 
                    'draft', 
                    'trash'
                ])
        };
        doc = this.topic = Document.new(this.valid_attrs);
    });

    it('creates a new doc given valid attributes', function() {
        doc.should.be.a('object');
        doc.validate().valid.should.be.true;
    });

    describe('Validations', function() {
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


        xit('requires an author');

        it('requires timestamps', function(done) {
            var topic = this.topic;
            topic.save(function(err) {
                should.not.exist(err);
                topic.should.have.property('ctime').with.a('number');
                topic.should.have.property('mtime').with.a('number');
                done();
            });
        });

        xit('allows for custom CSS and JS');
        xit('supports revisions');
        xit('is aware of which users can edit it');
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
    });
});

