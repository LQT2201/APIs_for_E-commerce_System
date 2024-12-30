const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
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
  }],
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  totalPrice: {
    type: Number,
    required: true
  },
  discountCode:{
    type:String,
    default:null
  },
  phoneNumber:{
    type:String,
  },
  shippingAddress: {
    province:{
      type:String
    },
    ward:{
      type:String
    },
    addressDetail:{
      type:String
    }
  },
  paymentMethod: {
    type: String,
    enum: ['paypal', 'cod'],
    default:'cod'
  },
},{
  timestamps:true
});


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
