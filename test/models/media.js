var should = require('chai').Should();
var phony = require('phony').make_phony();

var Media = require('../../models/media');
var helpers = require('../helpers');

describe('Media model', function() {
    var media;

    before(function() { 
        this.create_valid_attrs = function() { 
            return {
                title: phony.title(),
                kind: 'audio',
                author: null,
                content: 'http://example.com/beethoven.mp3',
                publish_status: 'in_review',
                caption: phony.lorem_sentence()
            };
        };
    });

    helpers.database_setup_teardown();

    beforeEach(function() {
        this.valid_attrs = this.create_valid_attrs();
        media = this.topic = new Media(this.valid_attrs);
    });

    it('creates a new media given valid attributes', function(done) {
        media.should.be.a('object');
        media.validate(done);
    });

    it('saves to the database', function(done) {
        media.save(function(err, saved_media) {
            should.not.exist(err);
            saved_media.should.equal(media);
            Media.findById(saved_media._id, function(err, retrieved_media) {
                should.not.exist(err);
                should.exist(retrieved_media);
                retrieved_media.id.should.equal(media.id);
                done();
            });
        });
    });

    describe('format recognition', function() { 
        helpers.enum('kind', 
            [ 'photo', 'video', 'audio' ], 
            [ 'image', 'picture', 'vid', 'asdf']
        );

        it('determines the format of the file based on the URL');
        it('allows only media formats that can be transcoded or viewed by browsers');
    });

    it('requires the content to be a valid web URL', function(done) { 
        media.content = 'ssh://google.com/image.jpg';
        media.validate(function(err) { 
            should.exist(err);
            err.errors.content.type.should.contain('url format');
            done();
        });
    });

    describe('thumbnail', function() { 
        it('requires a valid URL');
        it('is automatically created if not uploaded');
    });

    it('sanitizes the caption to contain only basic HTML', function(done) { 
        media.caption = 'Hi this is stuff. <script src="google.com/js.js"></script>';
        media.save(function(err) { 
            should.not.exist(err);
            media.caption.should.not.contain('<script');
            done();
        });
    });

    it('overrides the slugging mechanism to give a uuid instead', function(done) { 
        media.save(function(err) { 
            should.not.exist(err);
            media.slug.should.not.match(/^[a-z0-9-_+ ]+$/);
            done();
        });
    });
    it('does not support a header image, unlike its parent', function(done) { 
        media.header_image = 'test';
        media.validate(done);
    });
});
