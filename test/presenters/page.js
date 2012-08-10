var chai = require('chai');
var should = chai.Should();
var _ = require('lodash');
var sinon = require('sinon');
//var phony = require('phony').make_phony();
var PageResource = require('../../resources/page');
var PagePresenter = require('../../presenters/page');

chai.use(require('sinon-chai'));

xdescribe('PagePresenter', function () {
    describe('#index', function () {
        it('redirects to post list on successful save');
        it('re-renders new template on failed save');
        it('passes parameters to Document resource');
    });
});
