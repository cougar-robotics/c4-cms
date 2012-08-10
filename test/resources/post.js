var should = require('chai').Should();
var _ = require('lodash');
var phony = require('phony').make_phony();

var Post = require('../../resources/post');
var helpers = require('../helpers');

describe('Post Resource', function() {
    var post;

    beforeEach(function() {
        this.valid_attrs = {
                id: phony.title().replace(/ /, '-')
            ,   title: phony.title()
            ,   content: phony.lorem_paragraphs(4)
                //TODO: test document-author relationship
            ,   author: null
            ,   publish_status: 'published'
            ,   categories: ['robotics', 'team', 'random']
        };
        post = this.topic = Post.new(this.valid_attrs);
    });

    it('creates a new post given valid attributes', function() {
        post.should.be.a('object');
        post.validate().valid.should.be.true;
    });

    describe('validations', function() {
    });

    describe('defaults', function() {
        it('includes a default value for categories', function() {
            this.topic.categories = undefined;
            var validation = this.topic.validate();
            validation.valid.should.be.true;
            validation.errors.should.be.empty;
            this.topic.categories.should.eql([]);
        });
    });

    xdescribe('comments', function() {

    });
});
