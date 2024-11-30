const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');
const auth = require('../middlewares/auth.middleware');

// Tạo mới sản phẩm (yêu cầu phải đăng nhập)
router.post('/', auth, ProductController.createProduct);

// Tạo mới nhiều sản phẩm (yêu cầu phải đăng nhập)
router.post('/create-multiple', ProductController.createMultipleProducts);
 
// Lấy danh sách sản phẩm cùng variation
router.get('/', ProductController.getProducts);
// Lấy danh sách sản phẩm
router.get('/withdiscount', ProductController.getProductsWithDiscount);

// Lấy thông tin một sản phẩm theo ID
router.get('/:productId', ProductController.getProductById);

// Lấy thông tin một sản phẩm theo ID
router.get('/:productId/detail', ProductController.getProductWithDetailsById);

// Lấy thông tin sản phẩm kèm các biến thể
router.get('/:productId/variations', ProductController.getProductWithVariations);

// Cập nhật thông tin sản phẩm (yêu cầu phải đăng nhập)
router.put('/:productId', auth, ProductController.updateProduct);

// Xóa sản phẩm (yêu cầu phải đăng nhập)
router.delete('/:productId', auth, ProductController.deleteProduct);

module.exports = router;
