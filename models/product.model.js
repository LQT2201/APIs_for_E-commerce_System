const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const removeAccents = require("remove-accents");

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
  normalized_description: {
    type: String,
    index: true // Tạo index trên trường chuẩn hóa
  },
  normalized_name: {
    type: String,
    index: true // Tạo index trên trường chuẩn hóa
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

// Middleware để tự động chuẩn hóa `name` trước khi lưu
productSchema.pre('save', function (next) {
  // Chuẩn hóa trường `name` thành `normalized_name`
  if (this.name) {
    this.normalized_name = removeAccents(this.name.toLowerCase());
  }
  next();
});

// Middleware để tự động chuẩn hóa khi sử dụng `findOneAndUpdate` hoặc `update`
productSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (update.name) {
    update.normalized_name = removeAccents(update.name.toLowerCase());
    this.setUpdate(update);
  }
  next();
});

// Thêm index cho các trường
productSchema.index({ name: 'text', description: 'text' }); // Tạo text index

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
