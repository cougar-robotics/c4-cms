var should = require('chai').Should();
var phony = require('phony').make_phony();
var _ = require('lodash');

var User = require('../../models/user');
var helpers = require('../helpers');
var Factory = require('../helpers/factories');

describe('User model', function() {
    var user;

    helpers.database_setup_teardown();

    beforeEach(function(done) {
        var that = this;
        Factory.build('user', function(_user) { 
            user = that.topic = _user;
            done();
        });
    });

    afterEach(helpers.remove_topic_document());

    it('creates a new user given valid attributes', function(done) {
        user.should.be.a('object');
        user.validate(done);
    });

    describe('roles', function() { 
    });

    _.each(['first', 'last'], function(property) { 
        describe(property + ' name', function() { 
            it('is required', function(done) { 
                user.name[property] = undefined;
                user.validate(function(err) { 
                    should.exist(err);
                    err.errors['name.' + property].type
                       .should.equal('required');
                    done();
                });
            });
            it('allows only letters', function(done) { 
                user.name[property] = 'J0hnny?';
                user.validate(function(err) { 
                    should.exist(err);
                    err.errors['name.' + property].type
                       .should.equal('letters only');
                    done();
                });
            });
            it('still allows unicode letters');
        });
    });

    describe('email', function() { 
        it('is checked for validity', function(done) { 
            user.email = 'invalid$em@il@googlemail.com';
            user.validate(function(err) { 
                should.exist(err);
                err.errors.email.type.should.equal('email format');
                done();
            });
        });
        it('still allows slight deviations like the + in gmail', function(done) { 
            user.email = 'valid.email2320+test@gmail.com';
            user.validate(done);
        });
    });

    describe('profile picture', function() { 
        it('has a default value', function() { 
            var user = new User;
            user.should.have.property('profile_pic');
        });
        it('is required to be a URL from the CDN');
    });

    describe('password', function() { 
        it('has no (unreasonable) upper bound on password length', function(done) { 
            user.password = phony.letters(40);
            user.validate(done);
        });
        it('is properly salted and hashed');
    });
});
