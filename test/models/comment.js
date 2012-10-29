var should = require('chai').Should();
var _ = require('lodash');
var phony = require('phony').make_phony();

var Comment = require('../../models/comment');
var helpers = require('../helpers');

describe('Comment model', function() {
    var comment;

    before(function() {
        this.create_valid_attrs = function() {
            return {
                    author: null
                ,   body: phony.lorem_paragraphs(4)
                ,   post: null
            };
        };
    });

    beforeEach(function() {
        this.valid_attrs = this.create_valid_attrs();
        comment = this.topic = new Comment(this.valid_attrs);
    });

    helpers.database_setup_teardown();

    afterEach(helpers.remove_topic_document());

    it('creates a new comment given valid attributes', function(done) {
        comment.should.be.a('object');
        comment.validate(done);
    });

    it('saves to the database', function(done) {
        comment.save(function(err, saved_comment) {
            should.not.exist(err);
            saved_comment.should.equal(comment);
            Comment.findById(saved_comment._id, function(err, retrieved_comment) {
                should.not.exist(err);
                should.exist(retrieved_comment);
                retrieved_comment.id.should.equal(comment.id);
                done();
            });
        });
    });

    it('has to have a parent post');
    it('knows when it was created by the post Author');

    it('cannot be created on a post with comments disabled');
    it('has a comment lockout of 15 seconds');

    it('requires a substantial body', function(done) { 
        comment.body = 'too short?';
        comment.validate(function(err) { 
            should.exist(err);
            err.errors.body.type.should.equal('length');
        });
    });

    describe('moderation', function() { 
        it('can predetermine spam');
    });
});
