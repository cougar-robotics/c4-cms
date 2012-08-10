var should = require('chai').Should();
var _ = require('lodash');
var phony = require('phony').make_phony();

var Page = require('../../resources/page');
var helpers = require('../helpers');

describe('Page Resource', function() {
    var page;
    before(function() {
        this.create_valid_attrs = function() {
            return {
                id: phony.title().replace(/ /, '-')
            ,   title: phony.title()
            ,   content: phony.lorem_paragraphs(5)
            ,   author: null
            ,   publish_status: 'published'
            };
        };
    });

    beforeEach(function() {
        this.valid_attrs = this.create_valid_attrs();
        page = this.topic = Page.new(this.valid_attrs);
    });

    it('creates a new page given valid attributes', function() {
        page.should.be.a('object');
        page.validate().valid.should.be.true;
    });

    describe('validations', function() {
    });

    describe('defaults', function() {
    });

    describe('hierarchy', function() {
        it('has many children', function(done) {
            var child_attrs = this.create_valid_attrs();
            Page.createPage(page.id, child_attrs, function(err, child) {
                should.not.exist(err);
                child.should.be.a('object');
                child.id.should.equal('page/' + page.id + '/' + child_attrs.id);
                done();
            });
        });
        xit('has only one parent');
    });
});
