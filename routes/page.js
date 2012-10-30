module.exports = function(app) {
    var PageController = app.controllers.page;
    // TODO: Figure out how to make the nested folder URLs
    app.resource('pages', PageController);

    app.get('/', function(req, res) { 
        res.send('home page');
    });

    // TODO: app.get(pageslug) -> SHOW page with corresponding slug
};
