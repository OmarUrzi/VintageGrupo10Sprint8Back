const path = require('path');
const DB = require('../database/models');
const sequelize = DB.sequelize;
const { Op } = require("sequelize");

let productController = {
    home: (req, res) => {
        res.redirect('/');
    },
    list: async(req, res) => {
        try {
            let products = await DB.Product.findAll({
                include: ["brands", "categories", "colors"]
            });
            return res.render('listadoProductos', { products: products })
        } catch (error) {
            res.send(error);
        }
    },
    detail: async(req, res) => {
        try {
            const product = await DB.Product.findByPk(req.params.id);
            console.log(product)
            return res.render('productDetail', { product });
        } catch (error) {
            res.send(error);
        }
    },
    create: async(req, res) => {
        try {
            let productBrand = await DB.Brand.findAll()
            let productCategory = await DB.Category.findAll()
            let productColor = await DB.Color.findAll()
            return res.render('create', { brand, categoryproduct, colorproduct })
        } catch (error) {
            res.render('error404')
            console.log(error);
        }
    },


    store: async(req, res) => {
        console.log('llegue al store')
        console.log(req.body)
        let productCreate = await DB.Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.file.filename,
            stock: req.body.stock,
            brandId: req.body.brandId,
            categoryId: req.body.categoryId,
            colorId: req.body.colorId
        })
        res.redirect('/');
    },

    edit: async(req, res) => {
        try {
            let product = await DB.Product.findByPk(req.params.id);
            console.log(product);
            res.render("edit", { product });
        } catch (error) {
            res.render('error404');
            console.log(error);
        }
    },


    update: async(req, res) => {
        let product = await req.body;
        product.id = req.params.id;
        product.image = req.file ? req.file.filename : req.body.oldImage;
        if (req.body.image === undefined) {
            product.image = product.oldImage;
        }

        console.log(product.image);
        console.log(product);

        delete product.oldImage;
        await DB.Product.update({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
            stock: req.body.stock,
            brandId: req.body.brandId,
            categoryId: req.body.categoryId,
            colorId: req.body.colorId
        }, {
            where: {
                id: req.params.id
            }
        });
        res.redirect('/');
    },

    destroy: async(req, res) => {
        let productId = req.params.id;
        await DB.Product.destroy({ where: { id: productId }, force: true });

        return res.redirect('/')
            .catch(error => res.send(error))
    },

    /*delete: (req, res) => {
        let productId = req.params.id;
        Product.findByPk(productId).then((products) => {
            });
        });
    },*/
}


module.exports = productController