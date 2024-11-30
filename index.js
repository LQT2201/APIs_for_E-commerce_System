const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const productRoutes = require("./routes/product.route");
const orderRoutes = require("./routes/orderRoute");
const userRoute = require('./routes/user.route')
const cartRoute = require('./routes/cart.route')

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log("Database connection error:", error));

// API routes
const discountRoutes = require('./routes/discount.route');

app.use('/api/discounts', discountRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoute);
app.use("/api", userRoute);

