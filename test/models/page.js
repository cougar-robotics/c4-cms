var should = require('chai').Should();
var _ = require('lodash');
var phony = require('phony').make_phony();

var Page = require('../../models/page');
var helpers = require('../helpers');

describe('Page Resource', function() {
    var page;

    before(function() {
        this.create_valid_attrs = function() {
            return {
                    _id: phony.title().replace(/ /, '-')
                ,   title: phony.title()
                ,   content: phony.lorem_paragraphs(4)
                ,   author: null
                ,   publish_status: 'published'
            };
        };
    });

    beforeEach(function() {
        this.valid_attrs = this.create_valid_attrs();
        page = this.topic = new Page(this.valid_attrs);
    });

    afterEach(function(done) {
        page.destroy(function(err) {
            if (!err || err.reason === 'not_found') { done(); }
            else { done(err); }
        });
    });

    it('creates a new page given valid attributes', function(done) {
        page.should.be.a('object');
        page.validate(done);
    });

    describe('hierarchy', function() {
        var child_attrs;
        beforeEach(function(done) {
            child_attrs = this.create_valid_attrs();
            page.save(done);
        });

        it('has many children', function(done) {
            Page.createPage(page._id, child_attrs, function(err, child) {
                should.not.exist(err);
                child.should.be.a('object');
                child._id.should.equal(page.id + '/' + child_attrs._id);
                done();
            });
        });
        it('has only one parent');
    });
});
