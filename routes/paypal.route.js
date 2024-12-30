const express = require("express");
const axios = require("axios");

const router = express.Router();

const PAYPAL_CLIENT_ID = 'AYz2oeHhA6g6p-WtBpukd6DRNOR-wLTt3lWirnJn8b9p9ruvfYzpSgT0PqqRmzY88F50kLSMHagSv1pJ';
const PAYPAL_SECRET = 'EDX0BWpE2syTDas8jyO-6_peJJLrOeBd8FiTSENHn75T5RhDG_5bggk7-RWyJ4061Sh_eyKhyJfvGOri';
const PAYPAL_API = 'https://api-m.sandbox.paypal.com';

// Endpoint để tạo order
router.post('/create-order', async (req, res) => {
  const { amount } = req.body;
  if (!amount) {
    return res.status(400).json({ error: "Amount is required" });
  }

  try {
    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: amount,
            },
          },
        ],
      },
      {
        auth: {
          username: PAYPAL_CLIENT_ID,
          password: PAYPAL_SECRET,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error creating PayPal order:", error.message);
    res.status(500).send(error.response?.data || { error: "Internal Server Error" });
  }
});

// Endpoint để capture order
router.post('/capture-order/:orderId', async (req, res) => {
  const { orderId } = req.params;
  if (!orderId) {
    return res.status(400).json({ error: "Order ID is required" });
  }

  try {
    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`,
      {},
      {
        auth: {
          username: PAYPAL_CLIENT_ID,
          password: PAYPAL_SECRET,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error capturing PayPal order:", error.message);
    res.status(500).send(error.response?.data || { error: "Internal Server Error" });
  }
});

module.exports = router;
