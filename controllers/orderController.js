const Order = require("../models/order");

const getOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ massage: error.massage });
  }
};

module.exports = { getOrder };
