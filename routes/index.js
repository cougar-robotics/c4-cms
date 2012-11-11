module.exports = function(app) {
    // Posts Controller Routes
    // =======================
    var Posts = app.controllers.posts;
    app.param('post' , Posts.load);


    app.get('/posts'            , Posts.index);
    app.get('/posts/search'     , Posts.search);

    app.get('/posts/new'        , Posts.new);
    app.post('/posts'           , Posts.create);

    app.get('/posts/:post'      , Posts.show);
    app.get('/posts/:post/edit' , Posts.edit);
    app.put('/posts/:post'      , Posts.update);
    app.delete('/posts/:post'   , Posts.destroy);

    // Page Controller Routes
    // ======================
    var Pages = app.controllers.pages;
    app.resource('pages', Pages);

    app.param('page' , Pages.load);

    app.get('/pages'            , Pages.index);
    app.get('/pages/new'        , Pages.new);
    app.post('/pages'           , Pages.create);
    app.get('/pages/:page'      , Pages.show);
    app.get('/pages/:page/edit' , Pages.edit);
    app.put('/pages/:page'      , Pages.update);
    app.delete('/pages/:page'   , Pages.destroy);

    app.get('/', function(req, res) { 
        res.send('home page');
    });

    // TODO: app.get(pageslug) -> SHOW page with corresponding slug
};
