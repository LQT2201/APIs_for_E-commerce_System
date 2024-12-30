const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

class CartService {
   // Get the cart with detailed product and variation information
   static async getCart(userId) {
    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');

        if (!cart) {
            throw new Error('Giỏ hàng không tồn tại');
        }

        // Map items to include relevant variation details
        const cartWithVariations = await Promise.all(
            cart.items.map(async (item) => {
                const product = await Product.findOne({ 'variations.sku': item.sku });

                if (product) {
                    const variation = product.variations.find((v) => v.sku === item.sku);

                    return {
                        quantity: item.quantity,
                        totalPrice: item.totalPrice,
                        price: item.price,
                        productName: product.name,
                        productId: product._id,
                        category: product.category,
                        variation: {
                            sku: variation.sku,
                            price: variation.price,
                            stockQuantity: variation.stockQuantity,
                            attributes: variation.attributes,
                            images: variation.images,
                            features: variation.features,
                            specifications: variation.specifications,
                        },
                    };
                }

                return item.toObject(); // Return original item if no variation is found
            })
        );

        return {
            ...cart.toObject(),
            items: cartWithVariations,
        };
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

      if (variation.stockQuantity < quantity)
        throw new Error(`Số lượng sản phẩm trong kho không đủ, chỉ còn ${variation.stockQuantity} sản phẩm`);

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

  static async updateCart(userId, productId, sku, quantity) {
    try {
      // Tìm sản phẩm trong cơ sở dữ liệu
      const product = await Product.findById(productId);
      if (!product) throw new Error('Sản phẩm không tồn tại');
  
      // Tìm biến thể của sản phẩm theo SKU
      const variation = product.variations.find(v => v.sku === sku);
      if (!variation) throw new Error('Biến thể sản phẩm không tồn tại');
  
      // Kiểm tra số lượng trong kho
      if (variation.stockQuantity < quantity) {
        throw new Error(`Số lượng sản phẩm trong kho không đủ, chỉ còn ${variation.stockQuantity} sản phẩm`);
      }
  
      // Tìm giỏ hàng của người dùng
      const cart = await Cart.findOne({ userId });
      if (!cart) throw new Error('Giỏ hàng không tồn tại');
  
      // Tìm sản phẩm trong giỏ hàng
      const itemIndex = cart.items.findIndex(item => item.sku === sku && item.productId.toString() === productId);
      if (itemIndex === -1) throw new Error('Sản phẩm không có trong giỏ hàng');
  
      // Cập nhật số lượng và giá trị tổng
      cart.items[itemIndex].quantity = quantity;
      cart.items[itemIndex].totalPrice = quantity * cart.items[itemIndex].price;
  
      // Lưu giỏ hàng đã cập nhật
      await cart.save();
  
      // Fetch updated cart with detailed product and variation information
      const updatedCart = await Cart.findOne({ userId }).populate('items.productId');
  
      // Map items to include detailed variation information
      const cartWithVariations = await Promise.all(
        updatedCart.items.map(async (item) => {
          const product = await Product.findOne({ 'variations.sku': item.sku });
  
          if (product) {
            const variation = product.variations.find((v) => v.sku === item.sku);
  
            return {
              quantity: item.quantity,
              totalPrice: item.totalPrice,
              price: item.price,
              productName: product.name,
              productId: product._id,
              category: product.category,
              variation: {
                sku: variation.sku,
                price: variation.price,
                stockQuantity: variation.stockQuantity,
                attributes: variation.attributes,
                images: variation.images,
                features: variation.features,
                specifications: variation.specifications,
              },
            };
          }
  
          return item.toObject();
        })
      );
  
      return {
        ...updatedCart.toObject(),
        items: cartWithVariations,
      };
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
