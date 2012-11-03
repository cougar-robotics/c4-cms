module.exports = function(app) {
    // Posts Controller Routes
    // =======================
    var PostController = app.controllers.post;
    app.resource('posts', PostController);

    // Page Controller Routes
    // ======================
    var PageController = app.controllers.page;
    app.resource('pages', PageController);

    app.get('/', function(req, res) { 
        res.send('home page');
    });

    // TODO: app.get(pageslug) -> SHOW page with corresponding slug
};
