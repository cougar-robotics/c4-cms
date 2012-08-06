var Seq = require('seq');
var should = require('should');
var _ = require('lodash');
var helpers = require('../helpers');

var document = module.exports = {};

document.validations = function() {
    helpers.requires([
        'title' 
    //,   'author'
    ,   'content'
    ]);
    
    helpers.enum('publish_status', [
        'in_review'
    ,   'published'
    ,   'draft'
    ,   'trash'
    ], [
        'poor_quality'
    ,   'dratt'
    ,   'trashy'
    ]);
    

    xit('requires an author');

    it('requires timestamps', function(done) {
        var topic = this.topic;
        topic.save(function(err) {
            should.not.exist(err);
            topic.should.have.property('ctime').with.a('number');
            topic.should.have.property('mtime').with.a('number');
            done();
        });
    });

    xit('allows for custom CSS and JS');
    xit('requires revisions');
    xit('uses the given id as the slug');
    xit('supports revisions');
    xit('is aware of which users can edit it');
};

document.defaults = function() {
    helpers.defaults({
        'publish_status': 'draft'
    });

    it('generates a slug automatically if id is missing', function(done) {
        var topic = this.topic;
        topic.id = undefined;
        topic.save(function(err) {
            should.not.exist(err);
            topic.should.have.property('id', topic.title.replace(/ /, '-'));
            done();
        });
    });
};
