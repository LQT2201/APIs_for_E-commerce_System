const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
