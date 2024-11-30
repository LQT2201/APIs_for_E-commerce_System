const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cart.controller');
const auth = require('../middlewares/auth.middleware');

// Lấy giỏ hàng của người dùng (yêu cầu phải đăng nhập)
router.get('/', auth, CartController.getCart);

// Thêm sản phẩm vào giỏ hàng (yêu cầu phải đăng nhập)
router.post('/add', auth, CartController.addToCart);

// Cập nhật sản phẩm trong giỏ hàng (yêu cầu phải đăng nhập)
router.put('/update', auth, CartController.updateCartItem);

// Xóa sản phẩm khỏi giỏ hàng (yêu cầu phải đăng nhập)
router.delete('/remove/:productId', auth, CartController.removeCartItem);

module.exports = router;
