var PostController = module.exports = {};

PostController.index = function(req, res){
    res.send('page index');
};

PostController.new = function(req, res){
    res.send('new page');
};

PostController.create = function(req, res){
    res.send('create page');
};

PostController.show = function(req, res){
    res.send('show page ' + req.params.page);
};

PostController.edit = function(req, res){
    res.send('edit page ' + req.params.page);
};

PostController.update = function(req, res){
    res.send('update page ' + req.params.page);
};

PostController.destroy = function(req, res){
    res.send('destroy page ' + req.params.page);
};
