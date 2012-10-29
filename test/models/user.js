var should = require('chai').Should();
var phony = require('phony').make_phony();

var Post = require('../../models/post');
var helpers = require('../helpers');

describe('Post Model', function() {
    var user;

    before(function() { 
        this.create_valid_attrs = function() { 
        };
    });

    beforeEach(function() {
        this.valid_attrs = this.create_valid_attrs();
        user = this.topic = new User(this.valid_attrs);
    });

    it('creates a new user given valid attributes', function(done) {
        post.should.be.a('object');
        post.validate(done);
    });

    describe('validations', function() {
        it('allows only letters for the first name');
        it('allows only letters for the last name');
        it('requires a valid email address');
        it('still allows slightly deviated address like the + in gmail');
        it('requires the profile pic to be a url from the CDN');
    });

    describe('defaults', function() {
        it('has a default profile pic');
    });

    describe('roles', function() { 
    });
});
