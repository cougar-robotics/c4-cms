var should = require('chai').Should();
var _ = require('lodash');
var phony = require('phony').make_phony();

var Page = require('../../resources/page');
var helpers = require('../helpers');

describe('Page', function() {
    var page;

    beforeEach(function() {
        this.valid_attrs = {
                id: phony.title().replace(/ /, '-')
            ,   title: phony.title()
            ,   content: phony.lorem_paragraphs(5)
            ,   author: null
            ,   publish_status: 'published'
        };
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

    xdescribe('hierarchy', function() {
        xit('has many children');
        xit('has only one parent');
    });
});
