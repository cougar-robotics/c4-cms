module.exports = function(app) {
    var PageController = app.controllers.page;
    app.resource('pages', PageController);
};
