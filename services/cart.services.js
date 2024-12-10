const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

class CartService {
  // Lấy giỏ hàng của người dùng
  static async getCart(userId) {
    try {
      const cart = await Cart.findOne({ userId })
      // .populate('items.productId');
      if (!cart) throw new Error('Giỏ hàng không tồn tại');
      return cart;
    } catch (error) {
      throw new Error(`Lỗi khi lấy giỏ hàng: ${error.message}`);
    }
  }

  // Thêm sản phẩm vào giỏ hàng
  static async addToCart(userId, productId, sku, quantity) {
    try {
      const product = await Product.findById(productId);
      if (!product) throw new Error('Sản phẩm không tồn tại');

      const variation = product.variations.find(v => v.sku === sku);
      if (!variation) throw new Error('Biến thể sản phẩm không tồn tại');

      const totalPrice = variation.price * quantity;

      // Tìm giỏ hàng của người dùng
      let cart = await Cart.findOne({ userId });

      if (!cart) {
        // Nếu không có giỏ hàng, tạo giỏ hàng mới
        cart = new Cart({
          userId,
          items: [{
            productId: product._id,
            sku: variation.sku,
            quantity,
            price: variation.price,
            totalPrice
          }]
        });
        await cart.save();
      } else {
        const existingItemIndex = cart.items.findIndex(item => item.sku === sku && item.productId.toString() === productId);

        if (existingItemIndex > -1) {
          // Nếu sản phẩm đã có trong giỏ, cập nhật số lượng và giá trị tổng
          const existingItem = cart.items[existingItemIndex];
          existingItem.quantity += quantity;
          existingItem.totalPrice = existingItem.quantity * existingItem.price;

          // Lưu giỏ hàng đã cập nhật
          cart.items[existingItemIndex] = existingItem;
          await cart.save();
        } else {
          // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
          cart.items.push({
            productId: product._id,
            sku: variation.sku,
            quantity,
            price: variation.price,
            totalPrice
          });
          await cart.save();
        }
      }

      return cart;
    } catch (error) {
      throw new Error(`Lỗi khi thêm vào giỏ hàng: ${error.message}`);
    }
  }

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  static async updateCart(userId, productId, sku, quantity) {
    try {
      const cart = await Cart.findOne({ userId });

      if (!cart) throw new Error('Giỏ hàng không tồn tại');

      const itemIndex = cart.items.findIndex(item => item.sku === sku && item.productId.toString() === productId);

      if (itemIndex === -1) throw new Error('Sản phẩm không có trong giỏ hàng');

      const item = cart.items[itemIndex];

      // Cập nhật số lượng và tính lại tổng giá trị
      item.quantity = quantity;
      item.totalPrice = item.quantity * item.price;

      // Lưu giỏ hàng sau khi cập nhật
      cart.items[itemIndex] = item;
      await cart.save();

      return cart;
    } catch (error) {
      throw new Error(`Lỗi khi cập nhật giỏ hàng: ${error.message}`);
    }
  }

  // Xóa sản phẩm khỏi giỏ hàng
  static async removeFromCart(userId, productId, sku) {
    try {
      const cart = await Cart.findOne({ userId });

      if (!cart) throw new Error('Giỏ hàng không tồn tại');

      const itemIndex = cart.items.findIndex(item => item.sku === sku && item.productId.toString() === productId);

      if (itemIndex === -1) throw new Error('Sản phẩm không có trong giỏ hàng');

      // Xóa sản phẩm khỏi giỏ hàng
      cart.items.splice(itemIndex, 1);
      await cart.save();

      return cart;
    } catch (error) {
      throw new Error(`Lỗi khi xóa sản phẩm khỏi giỏ hàng: ${error.message}`);
    }
  }
}

module.exports = CartService;
