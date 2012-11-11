var Post = require('../models/post');
var Posts = module.exports = {};
var _ = require('lodash');

Posts.index = function(req, res){
    Post.find({publish_status: 'published'})
        .limit(10)
        .exec(function (err, posts) {
            res.render('posts/index', {
                title: 'Listing All Posts',
                posts: posts
            });
        });
};

Posts.new = function(req, res){
    res.render('posts/new', {
        title: 'New Post',
        post: {
            title: 'Insert a Title',
            author: 'Who wrote this?',
            body: ''
        },
        action: '/posts'
    });
};

Posts.create = function(req, res){
    var post = new Post(_.pick(req.body, 
        'title', 'slug', 'content', 'publish_status', 'categories'));
    if (typeof post.categories === 'string') {
        post.categories = [post.categories];
    }
    post.save(function(err) {
        if (!err) { 
            req.flash('info', 'Post ' + req.body.title + ' successfully created.');
            res.redirect('/posts'); 
        } else {
            req.flash('error', err);
            res.redirect('/posts/new');
        }
    });
};

Posts.show = function(req, res){
    res.render('posts/show', {
        title: req.post.title,
        post: req.post
    });
};

Posts.edit = function(req, res){
    var post = req.post;
    res.render('posts/edit', {
        title: 'Edit ' + post.title,
        post: post,
        action: '/posts/' + post.slug
    });
};

Posts.update = function(req, res){
    var post = req.post;
    post.merge(_.pick(req.body, 
        'title', 'slug', 'content', 'publish_status', 'categories'));
    if (typeof post.categories === 'string') {
        post.categories = [post.categories];
    }
    post.save(function(err) {
        if (!err) {
            req.flash('info', 'Post ' + post.title + ' successfully updated.');
            res.redirect('/posts/' + post.slug); 
        } else {
            req.flash('error', err);
            res.redirect('/posts/' + post.slug + '/edit');
        }
    });
};

Posts.destroy = function(req, res){
    req.post.remove(function(err) { 
        if (err) { req.flash(err); }
        res.redirect('/posts');
    });
};

Posts.load = function(req, res, next, id) {
    Post.findOne({slug: id}, function(err, post) { 
        if (err) { next(err); }
        else if (!post) { next({message: 'No post was found.'}); }
        else { 
            req.post = post;
            next(); 
        }
    });
};
