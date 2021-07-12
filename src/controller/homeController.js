const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;

let homeController = {

    leerTodos: (req, res) =>{
        db.Product.findAll()
            .then(products => {
                return res.render(path.resolve(__dirname, '..', 'views',  'index'),{products})
            })


        
    }

}

module.exports = homeController