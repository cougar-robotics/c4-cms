var should = require('should');
var _ = require('lodash');
var Faker = require('Faker');

var Page = require('../../resources/page');
var helpers = require('../helpers');

describe('Page', function() {
    var page;

    beforeEach(function() {
        this.valid_attrs = {
                id: Faker.Lorem.sentence(10).replace(/ /, '-')
            ,   title: Faker.Lorem.sentence(15)
            ,   content: Faker.Lorem.paragraphs(5)
            ,   author: null
            ,   publish_status: Faker.Helpers.randomize(['published', 'in_review', 'draft', 'trash'])
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
