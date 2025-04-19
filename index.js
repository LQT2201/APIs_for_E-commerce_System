const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const routes = require("./routes/index");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const options = require("./configs/swaggerOption");
const Product = require("./models/product.model");

dotenv.config();

const app = express();
const corsOptions = {
  origin: [
    "http://localhost:3305",
    "https://ie-307-6017b574900a.herokuapp.com",
  ], // Allow specific origins
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  credentials: true, // Allow cookies or authorization headers with requests
};

app.use(cors(corsOptions));

app.use(express.json());

const PORT = process.env.PORT || 5000;

// Kết nối với MongoDB
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log("Database connection error:", error));

// Tạo Swagger spec và cấu hình Swagger UI
const swaggerSpec = swaggerJSDoc(options);
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.use("/", routes);
