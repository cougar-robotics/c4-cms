var should = require('chai').Should();
var _ = require('lodash');
var Seq = require('seq');

var helpers = module.exports = {};

// Validation Helpers
// ==================

// A little function to automate testing whether or not a model requires
// a field. Takes in a list of properties (`this` is bound to the same subject
// as usual, so we can access `this.topic`) and creates the necessary tests.

helpers.requires = function(properties) {
    _.each(properties, function(property) {
        it('requires the ' + property + ' field', function() {
            var validation;
            this.topic[property] = undefined;
            validation = this.topic.validate();

            validation.valid.should.be.false;
            validation.errors.should.have.length(1);
            validation.errors[0].should.have.property('property', property)
            validation.errors[0].should.have.property('attribute', 'required');
        });
    });
};

// This function tests all the enum property by taking all the good values and
// a couple bad ones.

helpers.enum = function(property, values, invalid_values) {
    it('only allows certain values for ' + property, function() {
        _.each(values, function(value) {
            this.topic[property] = value;
            var validation = this.topic.validate();

            validation.valid.should.be.true;
            validation.errors.should.be.emtpy;
        }, this);

        _.each(invalid_values, function(value) {
            this.topic[property] = value;
            var validation = this.topic.validate();

            validation.valid.should.be.false;
            validation.errors.should.have.length(1);
            validation.errors[0].should.have.property('property', property);
            validation.errors[0].should.have.property('attribute', 'enum');
        }, this);
    });
};

// Tests to make sure a default is automatically popped into the resource if
// empty.

helpers.defaults = function(defaults) {
    _.each(defaults, function(value, property) {
        it('includes a default value for ' + property, function() {
            this.topic[property] = undefined;
            var validation = this.topic.validate();
            validation.valid.should.be.true;
            validation.errors.should.be.empty;
            this.topic.should.have.property(property, value);
        });
    });
};

