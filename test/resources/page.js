var should = require('should');
var _ = require('lodash');

var Page = require('../../resources/page');
var document = require('./document');
var helpers = require('../helpers');

describe('Page', function() {
    var page;

    before(function() {
        this.valid_attrs = {
                id: 'test_page'
            ,   title: 'This is a Title'
            ,   author: null
            ,   content: 'This is the content. It may be rather long.'
            ,   publish_status: 'published'
        };
    });

    beforeEach(function(done) {
        var that = this;
        Page.create(this.valid_attrs, function(err, _page) {
            if (err) return done(err);
            page = that.topic = _page;
            page.save(done);
        });
    });

    it('creates a new page given valid attributes', function(done) {
        Page.create(this.valid_attrs, function(err, page) {
            should.not.exist(err);
            page.should.be.a('object');
            done();
        });
    });

    describe('validations', function() {
        document.validations();
    });

    describe('defaults', function() {
        document.defaults();
    });

    xdescribe('hierarchy', function() {
        xit('has many children');
        xit('has only one parent');
    });
});
