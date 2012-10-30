var should = require('chai').Should();
var phony = require('phony').make_phony();

var Gallery = require('../../models/gallery');
var helpers = require('../helpers');

describe('Gallery model', function() {
    var gallery;

    before(function() { 
        this.create_valid_attrs = function() { 
            return {
                title: phony.title()
            ,   content: phony.lorem_paragraphs(4)
            ,   author: null
            ,   publish_status: 'published'
            ,   header_image: null
            ,   media: null
            };
        };
    });

    beforeEach(function() {
        this.valid_attrs = this.create_valid_attrs();
        gallery = this.topic = new Gallery(this.valid_attrs);
    });

    helpers.database_setup_teardown();

    afterEach(helpers.remove_topic_document);

    it('creates a new gallery given valid attributes', function(done) {
        gallery.should.be.a('object');
        gallery.validate(done);
    });

    it('saves to the database');

    it('has many photos');

    it('allows an ObjectId to be the header image');
});
