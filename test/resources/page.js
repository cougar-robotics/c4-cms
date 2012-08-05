var Page = require('../../resources/page');
var document = require('./document');

describe('Page', function() {
    describe('fields', function() {
        var page;

        beforeEach(function(done) {
            var that = this;
            Page.create({
                id: 'test_page',
                title: 'This is a Title',
                author: null,
                content: 'This is the content. It may be rather long.'
            }, function(err, _page) {
                page = that.doc = _page;
                page.save(done);
            });
        });

        afterEach(function(done) {
            Page.destroy('test_page', function(err) {
                done();
            });
        });

        document.behavior();
    });
});
