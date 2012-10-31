var should = require('chai').Should();
var _ = require('lodash');
var phony = require('phony').make_phony();

var Post = require('../../models/post');
var helpers = require('../helpers');

describe('Post model', function() {
    var post;

    before(function() { 
        this.create_valid_attrs = function() { 
            return {
                title: phony.title()
            ,   content: phony.lorem_paragraphs(4)
            ,   author: null
            ,   publish_status: 'published'
            ,   categories: ['robotics', 'team', 'random']
            }
        };
    });

    beforeEach(function() {
        this.valid_attrs = this.create_valid_attrs();
        post = this.topic = new Post(this.valid_attrs);
    });

    helpers.database_setup_teardown();

    afterEach(helpers.remove_topic_document);

    it('creates a new post given valid attributes', function(done) {
        post.should.be.a('object');
        post.validate(done);
    });

    it('saves to the database', function(done) {
        post.save(function(err, saved_post) {
            should.not.exist(err);
            saved_post.should.equal(post);
            Post.findById(saved_post._id, function(err, retrieved_post) {
                should.not.exist(err);
                should.exist(retrieved_post);
                retrieved_post.id.should.equal(post.id);
                done();
            });
        });
    });

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

    describe('comments', function() {

    });
});
