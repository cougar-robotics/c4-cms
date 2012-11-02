var should = require('chai').Should();
var _ = require('lodash');
var phony = require('phony').make_phony();

var Page = require('../../models/page');
var helpers = require('../helpers');
var Factory = require('../helpers/factories');

describe('Page model', function() {
    var page;

    helpers.database_setup_teardown();

    beforeEach(function(done) {
        var that = this;
        Factory.build('page', function(_page) { 
            page = that.topic = _page;
            done();
        });
    });

    afterEach(helpers.remove_topic_document());

    it('creates a new page given valid attributes', function(done) {
        page.should.be.a('object');
        page.validate(done);
    });

    it.skip('creates a valid url', function() { 
        this.topic.url.should.match(helpers.url_regex);
    });

    describe('header image', function() {
        it('rejects non-http(s) URLs', function(done) { 
            page.header_image = 'asdfasdf://example.com/foo.jpg';
            page.validate(function(err) { 
                should.exist(err);
                err.errors.header_image.type.should.contain('url format');
                done();
            });
        });

        it('rejects non-URLs', function(done) { 
            page.header_image = 'foo.jpg';
            page.validate(function(err) { 
                should.exist(err);
                err.errors.header_image.type.should.contain('url format');
                done();
            });
        });

        it('automatically downloads the picture to the CDN');

        helpers.optional([ 'header_image' ]);
    });


    describe('hierarchy', function() {
    });
});
