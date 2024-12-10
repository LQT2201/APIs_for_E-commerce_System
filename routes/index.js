const productRoutes = require("./product.route");
const userRoutes = require("./user.route")
const categoryRoutes = require("./category.route")
const cartRoutes = require('./cart.route')

const express = require('express');
const router = express.Router();

router.use('/product',productRoutes)
router.use('/category',categoryRoutes)
router.use('/user',userRoutes)
router.use('/cart',cartRoutes)



// Định nghĩa route mặc định nếu cần
router.get('/', (req, res) => {
    res.send('API chính của chúng tôi');
  });
  
module.exports = router