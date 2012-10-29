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

    beforeEach(function() {
        this.valid_attrs = this.create_valid_attrs();
        media = this.topic = new Media(this.valid_attrs);
    });

    it('creates a new media given valid attributes', function(done) {
        media.should.be.a('object');
        media.validate(done);
    });

    describe('format recognition', function() { 
        helpers.enum('kind', 
            [ 'photo', 'video', 'audio' ], 
            [ 'image', 'picture', 'vid', 'asdf']
        );

        it('determines the format of the file based on the URL');
        it('allows only media formats that can be transcoded or viewed by browsers');
    });

    it('requires the content to be a valid http(s) URL');

    describe('thumbnail', function() { 
        it('requires a valid URL');
        it('is automatically created if not uploaded');
    });

    it('sanitizes the caption to contain only basic HTML');
    it('overrides the slugging mechanism to give a uuid instead');
    it('does not support a header image, unlike its parent');
});
