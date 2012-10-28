var should = require('chai').Should();
var _ = require('lodash');
var phony = require('phony').make_phony();

var Post = require('../../models/post');
var helpers = require('../helpers');

describe('Post Model', function() {
    var post;

    beforeEach(function() {
        this.valid_attrs = {
                id: phony.title().replace(/ /, '-')
            ,   title: phony.title()
            ,   content: phony.lorem_paragraphs(4)
            ,   author: null
            ,   publish_status: 'published'
            ,   categories: ['robotics', 'team', 'random']
        };
        post = this.topic = new Post(this.valid_attrs);
    });

    it('creates a new post given valid attributes', function(done) {
        post.should.be.a('object');
        post.validate(done);
    });

    describe('validations', function() {
    });

    describe('defaults', function() {
        it('includes a default value for categories', function(done) {
            var attrs = _.omit(this.valid_attrs, 'categories');
            var post = new Post(attrs);
            var that = this;

            this.topic.validate(function(err) {
                should.not.exist(err);
                should.exist(post.categories);
                post.categories.should.be.a('array')
                               .and.be.empty;
                done();
            });
        });
    });

    xdescribe('comments', function() {

    });
});
