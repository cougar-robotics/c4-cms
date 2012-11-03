var Factory = module.exports = require('factory-lady');
var phony = require('phony').make_phony();

var Document = require('../../models/document');
var Page = require('../../models/page');
var Post = require('../../models/post');
var Comment = require('../../models/comment');

var Media = require('../../models/media');
var Gallery = require('../../models/gallery');

var User = require('../../models/user');

Factory.define('document', Document, {
    title: function(cb) { cb(phony.title()); }
,   content: function(cb) { cb(phony.lorem_paragraphs(4)); }
,   author: Factory.assoc('user', 'id')
,   publish_status: 'published'
});

Factory.define('page', Page, {
    title: function(cb) { cb(phony.title()); }
,   content: function(cb) { cb(phony.lorem_paragraphs(4)); }
,   author: Factory.assoc('user', 'id')
,   publish_status: 'published'
,   header_image: 'http://example.com/foo.php?f=foo-img.jpg'
});

Factory.define('post', Post, {
    title: function(cb) { cb(phony.title()); }
,   content: function(cb) { cb(phony.lorem_paragraphs(4)); }
,   author: Factory.assoc('user', 'id')
,   publish_status: 'published'
,   categories: ['robotics', 'team', 'random']
});

Factory.define('comment', Comment, {
    author: Factory.assoc('user', 'id')
,   body: function(cb) { cb(phony.lorem_paragraphs(4)); }
,   post: Factory.assoc('post', 'id')
});

Factory.define('media', Media, {
    title: function(cb) { cb(phony.title()); }
,   kind: 'audio'
,   author: Factory.assoc('user', 'id')
,   content: 'http://example.com/beethoven.mp3'
,   publish_status: 'in_review'
,   caption: function(cb) { cb(phony.lorem_sentence()); }
});

Factory.define('gallery', Gallery, {
    title: function(cb) { cb(phony.title()); }
,   content: function(cb) { cb(phony.lorem_paragraphs(4)); }
,   author: Factory.assoc('user', 'id')
,   publish_status: 'published'
,   header_image: null
,   media: [ Factory.assoc('media', 'id'), Factory.assoc('media', 'id') ]
});

Factory.define('user', User, {
    name: function(cb) {
        cb({
            display: phony.name(),
            first: phony.first_name(),
            last: phony.surname()
        });
    }
,   role: 'restr_editor'
,   email: function(cb) { cb(phony.email_address()); }
,   profile_pic: 'http://example.com/foo.php?f=foo-img.jpg'
,   password: function(cb) { cb(phony.letters(25)); }
,   gender: 'other'
,   birthday: new Date('11/23/2012')
,   preferences: { }
});
