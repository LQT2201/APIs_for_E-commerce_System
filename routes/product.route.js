const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');

router.post('/create',ProductController.createProduct)

router.get('/',ProductController.getAllProduct)

router.get('/:productId',ProductController.getProductById)

router.get('/:categoryId/findByCate',ProductController.getAllProductByCategory)

router.post('/:productId/update',ProductController.updateProduct)

module.exports = router;
