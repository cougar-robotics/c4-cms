var should = require('chai').Should();
var _ = require('lodash');
var async = require('async');
var mongoose = require('mongoose');

var helpers = module.exports = {};

// A convenient reference to the global configuration object.

helpers.config = require('../config');

helpers.url_regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

// Setup/Teardown Helpers
// ======================


// Connect and disconnect from the database for each suite.
helpers.database_setup_teardown = function() { 
    before(function() {
        mongoose.connect(helpers.config.get('test-database'));
    });

    after(function(done) {
        mongoose.disconnect(done);
    });
};

// Memove the topic document from the database, if it's there.
helpers.remove_topic_document = function() { 
    return function(done) {
        this.topic.remove(done);
    };
};

// Validation Helpers
// ==================

// A little function to automate testing whether or not a model requires
// a field. Takes in a list of properties (`this` is bound to the same subject
// as usual, so we can access `this.topic`) and creates the necessary tests.

helpers.requires = function(property) {
    it('requires the ' + property + ' field', function(done) {
        this.topic[property] = undefined;
        this.topic.validate(function(err) {
            should.exist(err);
            err.errors[property].type.should.equal('required');
            done();
        });
    });
};

helpers.optional = function(properties) {
    _.each(properties, function(property) {
        it('does not require the ' + property + ' field', function(done) {
            this.topic[property] = undefined;
            this.topic.validate(function(err) {
                should.not.exist(err);
                done();
            });
        });
    });
};

// This function tests all the enum property by taking all the good values and
// a couple bad ones.

helpers.enum = function(property, values, invalid_values) {
    it('only allows certain values for ' + property, function(done) {
        //TODO: Refactor
        var that = this;
        async.series([
            function valid_attrs(next) {
                async.forEachSeries(values, function(value, _next) {
                    that.topic[property] = value;
                    that.topic.validate(function(err) { 
                        should.not.exist(err);
                        _next();
                    });
                }, next);
            },
            function invalid_attrs(next) {
                async.forEachSeries(invalid_values, function(value, _next) {
                    that.topic[property] = value;
                    that.topic.validate(function(err) { 
                        should.exist(err);
                        err.errors[property].type.should.equal('enum');
                        _next();
                    });
                }, next);
            }
        ], done);
    });
};

// Tests to make sure a default is automatically popped into the resource if
// empty.

helpers.defaults = function(konstructor, defaults) {
    _.each(defaults, function(value, property) {
        it('includes a default value for ' + property, function(done) {
            var attrs = _.omit(this.valid_attrs, property);
            var topic = new konstructor(attrs);
            topic.should.have.property(property, value);
            topic.validate(done);
        });
    });
};


// Uniqueness Errors
// ==================

// Make sure the field requires uniqueness.
helpers.unique = function(konstructor, properties) { 
    _.each(properties, function(property) { 
        it('requires ' + property + ' to be unique', function(done) { 
            var original = this.topic;
            var duplicate = new konstructor(this.create_valid_attrs());

            original.save(function(err) { 
                should.not.exist(err);
                duplicate[property] = original[property];
                duplicate.save(function(err) { 
                    should.exist(err);
                    err.err.should.include('duplicate key error');
                    done();
                });
            });
        });
    });
};
