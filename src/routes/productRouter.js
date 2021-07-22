const express = require('express');

const router = express.Router();
const productController = require('../controller/productController');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../public/img'),
    filename: (req, file, cb) => { cb(null, 'img-' + Date.now() + path.extname(file.originalname)) }
});


const { body } = require('express-validator')

const validations = require('../middlewares/productValidation');

const upload = multer({ storage })






router.get('/listar', productController.list)

//router.get('/listarborrado', productController.listarDelete)

router.get('/edit/:id', productController.edit)

router.get('/detail/:id', productController.detail)

router.get('/create', upload.single('image'), productController.create)

router.post('/store', upload.single('image'), validaciones, validations, productController.store);

router.put('/:id', upload.single('image'), validacionesEdit, validations, productController.update);

//router.put('/:id/recover', productController.recover);

router.delete('/:id', productController.destroy);

module.exports = router;