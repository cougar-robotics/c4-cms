var should = require('chai').Should();
var phony = require('phony').make_phony();

var Gallery = require('../../models/gallery');
var helpers = require('../helpers');

describe('Gallery model', function() {
    var gallery;

    before(function() { 
        this.create_valid_attrs = function() { 
        };
    });

    beforeEach(function() {
        this.valid_attrs = this.create_valid_attrs();
        gallery = this.topic = new Gallery(this.valid_attrs);
    });

    it('creates a new media given valid attributes', function(done) {
        gallery.should.be.a('object');
        gallery.validate(done);
    });

    it('saves to the database');

    it('has many photos');
});
