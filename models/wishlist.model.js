const mongoose = require('mongoose');

// Define the Wishlist schema
const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',  // Reference to the Product model
        required: true,
      },
    },
  ],
}, { timestamps: true });

// Create a model for the Wishlist schema
const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
