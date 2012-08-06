var should = require('should');
var _ = require('lodash');
var Faker = require('Faker');

var Post = require('../../resources/post');
var helpers = require('../helpers');

describe('Post', function() {
    var post;

    beforeEach(function() {
        this.valid_attrs = {
                id: Faker.Lorem.sentence(10).replace(/ /, '-')
            ,   title: Faker.Lorem.sentence(15)
            ,   content: Faker.Lorem.paragraphs(5)
                //TODO: test document-author relationship
            ,   author: null
            ,   publish_status: Faker.Helpers.randomize(['published', 'in_review', 'draft', 'trash'])
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
