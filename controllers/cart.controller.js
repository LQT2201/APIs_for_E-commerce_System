const CartService = require('../services/cart.services');

const CartController = {
  /**
   * Get the cart for a user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  getCart: async (req, res) => {
    try {
      const userId = req.user._id; // Giả sử userId lấy từ thông tin đã đăng nhập
      const cart = await CartService.getCart(userId);
      res.status(200).json({ success: true, cart });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  /**
   * Add product to the cart
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  addToCart: async (req, res) => {
    try {
      console.log(req,'asdfds')

      const { productId, quantity, price } = req.body;  // Lấy dữ liệu sản phẩm từ body request
      const userId = req.user._id;  // Giả sử userId lấy từ thông tin đã đăng nhập
      const updatedCart = await CartService.addToCart(userId, productId, quantity, price);
      res.status(200).json({ success: true, cart: updatedCart });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  /**
   * Update the quantity of a product in the cart
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  updateCartItem: async (req, res) => {
    try {
      const { productId, newQuantity } = req.body;  // Lấy dữ liệu cập nhật từ body request
      const userId = req.user._id;  // Giả sử userId lấy từ thông tin đã đăng nhập
      const updatedCart = await CartService.updateCartItem(userId, productId, newQuantity);
      res.status(200).json({ success: true, cart: updatedCart });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  /**
   * Remove a product from the cart
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  removeCartItem: async (req, res) => {
    try {
      const { productId } = req.params;  // Lấy productId từ URL params
      const userId = req.user._id;  // Giả sử userId lấy từ thông tin đã đăng nhập
      const updatedCart = await CartService.removeCartItem(userId, productId);
      res.status(200).json({ success: true, cart: updatedCart });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
};

module.exports = CartController;
