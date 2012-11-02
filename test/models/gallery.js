var should = require('chai').Should();
var phony = require('phony').make_phony();

var Gallery = require('../../models/gallery');
var helpers = require('../helpers');
var Factory = require('../helpers/factories');

describe('Gallery model', function() {
    var gallery;

    beforeEach(function(done) {
        var that = this;
        Factory.build('gallery', function(_gallery) { 
            gallery = that.topic = _gallery;
            done();
        });
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
