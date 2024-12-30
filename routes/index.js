const productRoutes = require("./product.route");
const userRoutes = require("./user.route")
const categoryRoutes = require("./category.route")
const cartRoutes = require('./cart.route')
const orderRoutes = require('./order.route')
const discountRoutes = require('./discount.route')
const addressRoutes = require('./address.route')
const paypalRoutes = require('./paypal.route')
const wishlistRoutes = require('./wishlist.route')

const express = require('express');
const router = express.Router();


router.use('/product',productRoutes)
router.use('/category',categoryRoutes)
router.use('/user',userRoutes)
router.use('/cart',cartRoutes)
router.use('/orders',orderRoutes)
router.use('/discount',discountRoutes)
router.use('/addresses',addressRoutes)
router.use('/paypal',paypalRoutes)
router.use('/wishlist',wishlistRoutes)




  
module.exports = router