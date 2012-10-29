var PostController = module.exports = {};

PostController.index = function(req, res){
    res.send('forum index');
};

PostController.new = function(req, res){
    res.send('new forum');
};

//PostController.create = function(req, res){
    //res.send('create forum');
//};

PostController.show = function(req, res){
    res.send('show forum ' + req.params.forum);
};

PostController.edit = function(req, res){
    res.send('edit forum ' + req.params.forum);
};

PostController.update = function(req, res){
    res.send('update forum ' + req.params.forum);
};

PostController.destroy = function(req, res){
    res.send('destroy forum ' + req.params.forum);
};
