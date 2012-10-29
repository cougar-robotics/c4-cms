module.exports = function(app) {
    var PostController = app.controllers.post;
    app.resource('posts', PostController);
};
