const express = require('express');
const router = express.Router();
const productsAPIController = require('../../controller/api/productApiController');

router.get('/', productsAPIController.list);
router.get('/count', productsAPIController.count);
router.get('/latest', productsAPIController.latest);
router.get('/:id', productsAPIController.detail);



module.exports = router;