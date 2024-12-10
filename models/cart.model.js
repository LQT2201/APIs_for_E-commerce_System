const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
  productId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Product', // Liên kết tới bảng Products
    required: true 
  },
  sku: { 
    type: String, 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true, 
    min: 1 
  },
  price: {
    type: Number, 
    required: true
  },
  totalPrice: {
    type: Number, 
    required: true
  }
});

const cartSchema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', // Liên kết tới người dùng
    required: true 
  },
  items: [cartItemSchema] // Danh sách các sản phẩm và biến thể trong giỏ hàng
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
