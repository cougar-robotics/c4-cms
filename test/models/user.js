var should = require('chai').Should();
var phony = require('phony').make_phony();
var _ = require('lodash');

var User = require('../../models/user');
var helpers = require('../helpers');

describe('User model', function() {
    var user;

    before(function() { 
        this.create_valid_attrs = function() { 
            return {
                name: {
                    display: phony.name(),
                    first: phony.first_name(),
                    last: phony.surname()
                },
                role: 'restr_editor',
                email: 'john.doe@gmail.com',
                profile_pic: 'http://example.com/foo.php?f=foo-img.jpg',
                password: phony.letters(25),
                gender: 'other',
                birthday: new Date('11/23/2012'),
                preferences: {
                }
            };
        };
    });

    helpers.database_setup_teardown();

    beforeEach(function() {
        this.valid_attrs = this.create_valid_attrs();
        user = this.topic = new User(this.valid_attrs);
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
        helpers.defaults(User, { profile_pic: undefined });
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
