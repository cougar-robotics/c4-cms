var should = require('should');
var _ = require('lodash');

var Post = require('../../resources/post');
var document = require('./document');

describe('Post', function() {
    var post;

    before(function() {
        this.valid_attrs = {
                id: 'test_post'
            ,   title: 'This is a Title'
            ,   author: null
            ,   content: 'This is the content. It may be rather long.'
            ,   publish_status: 'published'
            ,   categories: ['robotics', 'team', 'random']
        }
    });

    beforeEach(function(done) {
        var that = this;
        Post.create(this.valid_attrs, function(err, _post) {
            if (err) return done(err);
            post = that.topic = _post;
            post.save(done);
        });
    });

    it('creates a new post given valid attributes', function(done) {
        Post.create(this.valid_attrs, function(err, post) {
            should.not.exist(err);
            post.should.be.a('object');
            done();
        });
    });

    describe('validations', function() {
        document.validations();
    });

    describe('defaults', function() {
        document.defaults();

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
