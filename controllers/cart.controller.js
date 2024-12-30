const CartService = require('../services/cart.services');

const CartController = {
  
  getCart: async (req, res) => {
    try {
      const userId = req.user._id; // Giả sử userId lấy từ thông tin đã đăng nhập
      const cart = await CartService.getCart(userId);
      res.status(200).json({ success: true, cart });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  addToCart: async (req, res) => {
    try {
      const { productId, sku, quantity } = req.body; 
      const userId = req.user._id;  
      const updatedCart = await CartService.addToCart(userId, productId, sku, quantity);
      res.status(200).json({ success: true, cart: updatedCart });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  updateCartItem: async (req, res) => {
    try {
      const { productId,sku, quantity } = req.body;  // Lấy dữ liệu cập nhật từ body request
      const userId = req.user._id;  // Giả sử userId lấy từ thông tin đã đăng nhập
      const updatedCart = await CartService.updateCart(userId, productId, sku, quantity);
      res.status(200).json({ success: true, cart: updatedCart });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  removeCartItem: async (req, res) => {
    try {
      const { productId,sku } = req.body;
      const userId = req.user._id;  // Giả sử userId lấy từ thông tin đã đăng nhập
      const updatedCart = await CartService.removeFromCart(userId, productId, sku);
      res.status(200).json({ success: true, cart: updatedCart });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
};

module.exports = CartController;
