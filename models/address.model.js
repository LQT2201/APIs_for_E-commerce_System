const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    ward: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    addressLine: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      default: 'Vietnam',
      trim: true,
    },
    isDefault: {
      type: Boolean,
      default: false, 
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model('Address', AddressSchema);
