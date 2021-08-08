function loggedMiddleware(req, res, next) {
    if (req.session.userLogged) {
        res.locals.userLogged = req.session.userLogged
        return res.redirect('/users/profile')
    }
    next();
}

module.exports = loggedMiddleware;