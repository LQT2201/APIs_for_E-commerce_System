const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discountSchema = new Schema({
  code: { 
    type: String,
    required: true,
    unique: true
  },
  description: { 
    type: String,
    required: true
  },
  discountAmount: {  
    type: Number,
    required: true
  },
  startDate: {  
    type: Date,
    required: true
  },
  endDate: {  
    type: Date,
    required: true
  },
  minOrderAmount: { 
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  usageLimit: {
    type: Number,
    required: true
  },
  usedCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Discount = mongoose.model('Discount', discountSchema);

module.exports = Discount;
