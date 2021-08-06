
const DB = require('../database/models');
const sequelize = DB.sequelize;

async function userLoggedMiddleware(req, res, next) {
    res.locals.userLogged = false;
    console.log('aca se viene la cookie')
    console.log(req.cookies)
    
    if(req.cookies.email){
        console.log('entre al if de email in cookie')
        let emailInCookie = req.cookies.email
    const userFromCookie = await DB.User.findOne({where: { email: emailInCookie}})
    
    if (userFromCookie) {
        console.log('entre al if de userfromcookie')

        req.session.userLogged = userFromCookie
        
        res.locals.userLogged = req.session.userLogged

        next();
    }



}
next();

}
module.exports = userLoggedMiddleware