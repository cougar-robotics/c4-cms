var should = require('chai').Should();
var _ = require('lodash');
var phony = require('phony').make_phony();
var mongoose = require('mongoose');

var Page = require('../../models/page');
var helpers = require('../helpers');

describe('Page Model', function() {
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
        mongoose.connect(helpers.config.get('database'));
    });

    beforeEach(function() {
        this.valid_attrs = this.create_valid_attrs();
        page = this.topic = new Page(this.valid_attrs);
    });

    afterEach(function(done) {
        page.remove(done);
    });

    after(function(done) {
        mongoose.disconnect(done);
    });

    it('creates a new page given valid attributes', function(done) {
        page.should.be.a('object');
        page.validate(done);
    });

    describe('hierarchy', function() {
    });
});
