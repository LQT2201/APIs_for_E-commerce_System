const Cart = require('../models/cart.model');
const Discount = require('../models/discount.model');
const Order = require('../models/order.model');
const Product = require('../models/product.model');

class OrderService {
  // Thêm mới đơn hàng
  static async createOrder(userId, orderData) {
    try {
      const { items, shippingAddress, paymentMethod, discountCode } = orderData;
  
      let totalOrderPrice = 0;
      const orderItems = [];
  
      // Xử lý từng sản phẩm trong đơn hàng
      for (let item of items) {
        const product = await Product.findById(item.productId);
        if (!product) throw new Error(`Sản phẩm với ID ${item.productId} không tồn tại`);
  
        const variation = product.variations.find(v => v.sku === item.sku);
        if (!variation) throw new Error(`Biến thể sản phẩm với SKU ${item.sku} không tồn tại`);
  
        if (variation.stockQuantity < item.quantity) {
          throw new Error(`Không đủ hàng trong kho. Chỉ còn ${variation.stockQuantity} sản phẩm ${item.sku}`);
        }
  
        const totalItemPrice = variation.price * item.quantity;
        totalOrderPrice += totalItemPrice;

        orderItems.push({
          productId: product._id,
          sku: variation.sku,
          quantity: item.quantity,
          price: variation.price,
          totalPrice: totalItemPrice,
        });
      }
      
      const discountData = ""
      // Áp dụng mã giảm giá (nếu có)
      if (discountCode) {
        const discount = await Discount.findOne({ code: discountCode, isActive: true });
  
        if (!discount) {
          throw new Error(`Mã giảm giá không hợp lệ hoặc đã hết hạn.`);
        }
  
        const currentDate = new Date();
        if (currentDate < discount.startDate || currentDate > discount.endDate) {
          throw new Error(`Mã giảm giá không nằm trong thời gian áp dụng.`);
        }
  
        if (discount.usageLimit && discount.usedCount >= discount.usageLimit) {
          throw new Error(`Mã giảm giá đã đạt giới hạn sử dụng.`);
        }

        totalOrderPrice -= (totalOrderPrice * discount.discountAmount) / 100;
        totalOrderPrice = Math.max(totalOrderPrice, 0);

        discount.usedCount += 1;
        await discount.save();

        discountData = discountCode
      }
  
      let phoneNumber = "Default"

      if(orderData.phoneNumber){
        phoneNumber = orderData.phoneNumber
      }
      // Tạo đơn hàng mới
      const newOrder = new Order({
        userId,
        items: orderItems,
        status: 'pending', // Trạng thái ban đầu là 'pending'
        totalPrice: totalOrderPrice,
        shippingAddress,
        paymentMethod,
        phoneNumber,
        discountCode:discountData
      });
  
      // Lưu đơn hàng vào cơ sở dữ liệu
      await newOrder.save();
  
      // Cập nhật kho hàng
      for (let item of orderItems) {
        const product = await Product.findById(item.productId);
        const variation = product.variations.find(v => v.sku === item.sku);
  
        variation.stockQuantity -= item.quantity;
        await product.save();
      }
      
      // Truy xuất giỏ hàng của người dùng
      const userCart = await Cart.findOne({ userId });
      if (!userCart) {
        throw new Error(`Không tìm thấy giỏ hàng cho người dùng với ID ${userId}`);
      }

      // Xóa sản phẩm đã mua ra khỏi giỏ hàng
      userCart.items = userCart.items.filter(cartItem =>
        !orderItems.some(orderItem => orderItem.sku === cartItem.sku)
      );

      userCart.save()
  
      return newOrder;
    } catch (error) {
      throw new Error(`Lỗi khi tạo đơn hàng: ${error.message}`);
    }
  }
  

  static async updateOrder(orderId, updateData) {
    try {
      // Lấy thông tin đơn hàng từ DB
      const order = await Order.findById(orderId);
      if (!order) throw new Error('Đơn hàng không tồn tại');

      const { items, status, shippingAddress, paymentMethod } = updateData;

      if (status) order.status = status;
      if (shippingAddress) order.shippingAddress = shippingAddress;
      if (paymentMethod) order.paymentMethod = paymentMethod;

      if (items && items.length > 0) {
        let totalOrderPrice = 0;
        for (let item of items) {
          const product = await Product.findById(item.productId);
          if (!product) throw new Error(`Sản phẩm với ID ${item.productId} không tồn tại`);

          const variation = product.variations.find(v => v.sku === item.sku);
          if (!variation) throw new Error(`Biến thể sản phẩm với SKU ${item.sku} không tồn tại`);

          // Kiểm tra số lượng trong kho
          if (variation.stockQuantity < item.quantity) {
            throw new Error(`Sản phẩm với SKU ${item.sku} không đủ số lượng trong kho`);
          }

          // Cập nhật giá trị tổng cho mỗi sản phẩm
          const totalPrice = variation.price * item.quantity;
          item.totalPrice = totalPrice;

          // Cập nhật lại tổng giá trị đơn hàng
          totalOrderPrice += totalPrice;
        }

        // Cập nhật lại các sản phẩm trong đơn hàng
        order.items = items;
        order.totalPrice = totalOrderPrice;
      }
      await order.save();
      
      return order;
    } catch (error) {
      throw new Error(`Lỗi khi cập nhật đơn hàng: ${error.message}`);
    }
  }

  static async getAllOrder() {
    try {
      const allOrder = await Order.find();
      if (!allOrder) throw new Error("Không lấy được tất cả đơn hàng");
  
      const detailOrder = await Promise.all(
        allOrder.map(async (order) => {
          const itemDetail = await Promise.all(
            order.items.map(async (item) => {
              const product = await Product.findById(item.productId);
  
              // Tìm biến thể chi tiết của SKU trong danh sách `variations`
              const variation = product.variations.find(
                (v) => v.sku === item.sku
              );
  
              return {
                ...item.toObject(),
                variationImage: variation ? variation.images : null, // Handle null variations gracefully
              };
            })
          );
  
          return { 
            ...order.toObject(), // Ensure you return the order data
            items: itemDetail, // Attach the detailed items
          };
        })
      );
  
      // Return the orders with detailed items
      return detailOrder;
    } catch (error) {
      console.log(error);
      throw new Error('Lỗi khi lấy tất cả đơn hàng', error);
    }
  }
  

  static async getOrderById(orderId) {
    try {
      // Tìm đơn hàng theo ID
      const order = await Order.findById(orderId);
  
      if (!order) {
        throw new Error('Đơn hàng không tồn tại');
      }

      const enrichedItems = await Promise.all(
        order.items.map(async (item) => {
          // Populate thông tin sản phẩm từ productId và tìm SKU trong `variations`
          const productDetails = await Product.findOne({
            _id: item.productId, // Tìm sản phẩm dựa trên productId
            'variations.sku': item.sku, // Tìm biến thể dựa trên SKU
          });
  
          // Nếu không tìm thấy sản phẩm hoặc SKU, thông báo lỗi
          if (!productDetails) {
            throw new Error(`Không tìm thấy sản phẩm hoặc SKU cho item: ${item.sku}`);
          }
  
          // Tìm biến thể chi tiết của SKU trong danh sách `variations`
          const variationDetails = productDetails.variations.find(
            (variation) => variation.sku === item.sku
          );
  
          // Trả về thông tin chi tiết của sản phẩm kết hợp với item
          return {
            ...item.toObject(), // Chuyển item từ Document sang Object
            productDetails: {
              _id: productDetails._id,
              name: productDetails.name,
              brand: productDetails.brand,
              images: productDetails.images,
            },
            variationDetails: {
              _id: variationDetails._id,
              sku: variationDetails.sku,
              attributes: variationDetails.attributes,
              price: variationDetails.price,
              images: variationDetails.images,
            }, // Thông tin biến thể chi tiết (SKU, giá, tồn kho,...)
          };
        })
      );
  
      // Trả về đơn hàng cùng thông tin sản phẩm chi tiết
      return {
        ...order.toObject(),
        items: enrichedItems, // Danh sách item đã được bổ sung thông tin sản phẩm và biến thể
      };
    } catch (error) {
      console.error('Lỗi khi lấy thông tin đơn hàng:', error.message);
      throw new Error('Lỗi khi lấy thông tin đơn hàng');
    }
  }
  

  static async getUserOrder(userId) {
    try {
      // Lấy danh sách đơn hàng của người dùng từ cơ sở dữ liệu
      const orders = await Order.find({ userId: userId });
  
      if (!orders || orders.length === 0) {
        throw new Error("Không có đơn hàng phù hợp");
      }
  
      // Lọc thông tin chi tiết của sản phẩm và biến thể
      const filterInfo = await Promise.all(
        orders.map(async (order) => {
          // Debugging: Kiểm tra chi tiết của đơn hàng
          console.log("Đơn hàng: ", order.items);
  
          const itemDetails = await Promise.all(
            order.items.map(async (item) => {
              // Lấy sản phẩm từ cơ sở dữ liệu dựa trên productId và SKU
              const product = await Product.findOne({
                _id: item.productId,  // Tìm sản phẩm theo productId
                'variations.sku': item.sku,  // Tìm biến thể sản phẩm theo SKU
              });
  
              // Nếu không tìm thấy sản phẩm hoặc biến thể, ném lỗi
              if (!product) {
                console.log("Không tìm thấy sản phẩm với SKU:", item.sku);
                throw new Error(`Không tìm thấy sản phẩm với SKU: ${item.sku}`);
              }
  
              // Tìm biến thể phù hợp
              const variations = product.variations.find(
                (variation) => variation.sku === item.sku
              );
  
              if (!variations) {
                console.log("Không tìm thấy biến thể phù hợp với SKU:", item.sku);
                throw new Error(`Không tìm thấy biến thể với SKU: ${item.sku}`);
              }
  
              // Trả về thông tin chi tiết của sản phẩm và biến thể
              return {
                product: {
                  _id: product._id,  // ID của sản phẩm
                  name: product.name,
                  brand: product.brand,
                  images: product.images,
                },
                variation: {
                  _id: variations._id,
                  sku: variations.sku,
                  attributes: variations.attributes,
                  price: variations.price,
                  images: variations.images,
                },
              };
            })
          );
  
          // Trả về thông tin đơn hàng cùng với các sản phẩm và biến thể chi tiết
          return {
            ...order.toObject(),
            items: itemDetails, // Các sản phẩm chi tiết đã được thêm vào
          };
        })
      );
  
      // Trả về đơn hàng cùng thông tin chi tiết về sản phẩm và biến thể
      return filterInfo;
  
    } catch (error) {
      // In ra lỗi để dễ dàng tìm nguyên nhân
      console.error('Lỗi khi lấy đơn hàng của người dùng:', error.message);
      throw new Error('Lỗi khi lấy đơn hàng của người dùng', error);
    }
  }
  
  
  

  static async deleteOrder(orderId){
    try {
        const deletedOrder = await Order.findByIdAndDelete(orderId)
        return deletedOrder
    } catch (error) {
        throw new Error('Lỗi khi xóa đơn hàng')
    }
  }
}

module.exports = OrderService;
