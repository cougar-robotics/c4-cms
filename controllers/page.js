var PageController = module.exports = {};

PageController.index = function(req, res){
    res.send('page index');
};

PageController.new = function(req, res){
    res.send('new page');
};

PageController.create = function(req, res){
    res.send('create page');
};

PageController.show = function(req, res){
    res.send('show page ' + req.params.page);
};

PageController.edit = function(req, res){
    res.send('edit page ' + req.params.page);
};

PageController.update = function(req, res){
    res.send('update page ' + req.params.page);
};

PageController.destroy = function(req, res){
    res.send('destroy page ' + req.params.page);
};
