// http://stackoverflow.com/a/12254857/237904

module.exports = function(req, res, next) {
    var session = req.session;
    var messages = session.messages || (session.messages = []);

    // Allow messages to be in views
    res.locals.messages = messages;

    req.flash = function(type, message) {
        if (typeof message === 'object') {
            message = message.toString();
        }
        messages.push({
            type: type,
            text: message
        });
    };

    next();
};
