var Pages = module.exports = {};

Pages.index = function(req, res){
    res.send('page index');
};

Pages.new = function(req, res){
    res.send('new page');
};

Pages.create = function(req, res){
    res.send('create page');
};

Pages.show = function(req, res){
    res.send('show page ' + req.params.page);
};

Pages.edit = function(req, res){
    res.send('edit page ' + req.params.page);
};

Pages.update = function(req, res){
    res.send('update page ' + req.params.page);
};

Pages.destroy = function(req, res){
    res.send('destroy page ' + req.params.page);
};
