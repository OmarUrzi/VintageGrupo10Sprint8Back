const path = require('path');
let db = require('../../database/models');
const sequelize = db.sequelize;
const Product = db.Product;
const _include = ["brands", "categories", "colors", "sizes"]


const productAPIController = {

    list: async (req, res) =>{
        console.log('estoy en el list del api')

        if ( !req.query.query ) {
            try{ 
                let products = await Product.findAll({
                    attributes:[
                        'id', 'name', 'description', 'price','discount','image','keywords'
                    ],
                    include: _include
                });
                

                let response = {
                    meta: {
                        status : 200,
                        total: products.length,
                        url: '/api/v1/products'
                    },
                    data: {
                        list: []
                    }
                }
                products.forEach(product => {
                    
                        response.data.list.push({
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        discount: product.discount,
                        price: product.price,
                        keywords: product.keywords,
                        brand: product.brands.dataValues.name,
                        category: product.categories.dataValues.name,
                        color: product.colors.dataValues.name,
                        size: product.sizes.dataValues.name,
                        image: product.image,
                        details: req.headers.host + `/api/v1/productos/${product.id}`
                    })
                    return product
                });
                console.log(response)
               return res.json(response);
            }
            catch(error){
                console.log(error)
                res.send({ err: 'Not found' });
            }
        } else {
            res.send({ err: 'Not found' });
        }
    },

    detail: (req, res) =>{
        let productId = req.params.id;
        Product.findByPk(productId,
            {
                include : _include
            })
            .then(product => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: product.length,
                        url: '/api/v1/productos/:id'
                    },
                    data: {
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        discount: product.discount,
                        price: product.price,
                        keywords: product.keywords,
                        brand: product.brands.dataValues.name,
                        category: product.categories.dataValues.name,
                        color: product.colors.dataValues.name,
                        size: product.sizes.dataValues.name,
                        image: product.image,
                }
                }
                res.json(respuesta);
            })
            .catch( err => {
                res.send({ err: 'Not found' });
            });
    },

    count: async (req, res) =>{
        try{ 
            let products = await Product.findAll();
            
            const categoria = req.params.category;
            let respuesta = {
                meta: {
                    status : 200,
                    total: products.length,
                    url: '/api/v1/productos/count',
                    text: "El total de categorias es " + categories.length
                },
                data: {}
            }
            res.json(respuesta);
        }
        catch(error){
            res.send({ err: 'Not found' });
        }
    },

    latest: (req, res) =>{
        Product.findOne({ 
        order: [
            ['id', 'DESC']
        ],
        include: _include
    })
    .then( product => JSON.parse(JSON.stringify(product)))
    .then( product => {
        let respuesta = {
            meta: {
                status: 200,
                url: '/api/v1/productos/latest'
            },
        data: {
            id: product.id,
            name: product.name,
            description: product.description,
            discount: product.discount,
            price: product.price,
            brand: product.brands.name,
            category: product.categories.name,
            color: product.colors.name,
            size: product.sizes.name,
            image: product.image
    }
}
res.json(respuesta);
    })
    
    .catch( err => {
        console.log(err)
        res.send({ err: 'Not found' });
    })
    
}
}

module.exports = productAPIController;