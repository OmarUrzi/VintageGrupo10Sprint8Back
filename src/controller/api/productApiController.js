const path = require('path');
let db = require('../../database/models');
const sequelize = db.sequelize;
const Product = db.Product;
/*const Brand = db.Brand;
const Category = db.Category;
const Color = db.Color;
const Size = db.Size;
const Visibility = db.Visibility;
const Image = db.Image;*/

const productAPIController = {

    list: async (req, res) =>{
        console.log('estoy en el list del api')

        if ( !req.query.query ) {
            try{ 
                let products = await Product.findAll({
                    attributes:[
                        'id', 'name', 'description', 'price','discount','image','keywords'
                    ],
                    include: [
                       "brands", "categories", "colors", "sizes"
                    ]
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
                        details: req.headers.host + `/api/v1/products/${product.id}`
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
        console.log('entre a Detail product')
        console.log('----------------------------')
        let productId = req.params.id;
        Product.findByPk(productId,
            {
                include : ['images','category','brand', 'color', 'size', 'visibility' ]
            })
            .then(product => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: product.length,
                        url: '/api/v1/products/:id'
                    },
                    data: {
                    id: product.id,
                    category: product.category.name,
                    name: product.name,
                    description: product.description,
                    extended_description: product.extended_description,
                    price: product.price,
                    color: product.color.name,
                    size: product.size.name,
                    stock: product.stock,
                    stock_min: product.stock_min,
                    stock_max: product.stock_max,
                    image: '/images/' + product.images[0].name,
                    visibilidad: product.visibility.name
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
            let products = await Product.findAll({
                include: [
                   "brand", "category", "color", "size", "visibility", "images"
                ]
            });
            
            const categoria = req.params.category;
            let respuesta = {
                meta: {
                    status : 200,
                    total: products.length,
                    url: '/api/v1/products/count'
                },
                data: products
            }
            res.json("El total de productos es: " + respuesta.meta.total);
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
        include: [
            "brand", "category", "color", "size", "visibility", "images"
         ]
    })
    .then( product => JSON.parse(JSON.stringify(product)))
    .then( product => {
        let respuesta = {
            meta: {
                status: 200,
                url: '/api/v1/products/latest'
            },
        data: {
        id: product.id,
        category: product.category.name,
        name: product.name,
        description: product.description,
        extended_description: product.extended_description,
        price: product.price,
        color: product.color.name,
        size: product.size.name,
        stock: product.stock,
        stock_min: product.stock_min,
        stock_max: product.stock_max,
        image: '/images/' + product.images[0].name,
        visibilidad: product.visibility.name
    }
}
res.json(respuesta);
    })
    
    .catch( err => {
        res.send({ err: 'Not found' });
    })
    
}
    


}

module.exports = productAPIController;