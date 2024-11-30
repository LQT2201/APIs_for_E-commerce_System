const Cart = require('../models/cart.model');

class CartService {
  // Lấy giỏ hàng của người dùng
  static async getCart(userId) {
    try {
      const cart = await Cart.findOne({ userId }).populate('items.productId');
      if (!cart) throw new Error('Cart not found');
      return cart;
    } catch (error) {
      throw new Error(`Error getting cart: ${error.message}`);
    }
  }

  // Thêm sản phẩm vào giỏ hàng
  static async addToCart(userId, productId, quantity, price) {
    try {
      let cart = await Cart.findOne({ userId });
      if (cart) {
        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          cart.items.push({ productId, quantity, price });
        }
      } else {
        cart = new Cart({
          userId,
          items: [{ productId, quantity, price }],
        });
      }
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(`Error adding to cart: ${error.message}`);
    }
  }

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  static async updateCartItem(userId, productId, newQuantity) {
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) throw new Error('Cart not found');

      const item = cart.items.find(item => item.productId.toString() === productId);
      if (!item) throw new Error('Product not found in cart');

      item.quantity = newQuantity;
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(`Error updating cart item: ${error.message}`);
    }
  }

  // Xóa sản phẩm khỏi giỏ hàng
  static async removeCartItem(userId, productId) {
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) throw new Error('Cart not found');

      cart.items = cart.items.filter(item => item.productId.toString() !== productId);
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(`Error removing cart item: ${error.message}`);
    }
  }
}

module.exports = CartService;
