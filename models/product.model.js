const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  spu: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  category: {
    type: Schema.Types.ObjectId,
    ref:'Category'
  },
  brand: {
    type: String
  },
  images: [{
    type: String
  }],
  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5
  },
  variations: [{ 
    sku: {
      type: String,
      required: true,
      unique: true
    },
    attributes: [{
      attributeName: { 
        type: String, 
        required: true 
      },
      values: [{ 
        type: String 
      }]
    }],
    price: {
      type: Number
    },
    stockQuantity: {
      type: Number
    },
    images: [{
      type: String
    }],
    features: [{  // Tính năng riêng cho biến thể
      featureName: { 
        type: String, 
      },
      description: { 
        type: String 
      }
    }],
    specifications: [{  // Các thông số kỹ thuật riêng cho biến thể
      specName: { 
        type: String, 
      },
      specValue: { 
        type: String, 
      }
    }]
  }]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
