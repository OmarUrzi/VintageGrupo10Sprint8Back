
//const userModel = require('../../model/users') aca se tendria q hacer un req de la base de datos etc.


function userLoggedMiddleware(req, res, next) {
    res.locals.userLogged = false;
    let emailInCookie = req.cookies.userEmail
    //let userFromCookie = userModel.fineByField('email', emailInCookie)  aca es donde se buscaria por PK al usuario
    let userFromCookie = "pepito@gmail.com"
    if (userFromCookie) {
        req.session.userLogged = userFromCookie
    }
    if (req.session.userLogged) {
        res.locals.userLogged = req.session.userLogged
    }
    next();
}
module.exports = userLoggedMiddleware