const express = require('express');
const User = require('../models/user.model');
const Product = require('../models/product.model');
const Wishlist = require('../models/wishlist.model');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

// Route to add product to wishlist
router.post('/add-to-wishlist', auth, async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  try {
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if wishlist already exists for the user
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      // Create a new wishlist if one doesn't exist
      wishlist = new Wishlist({ user: userId, products: [] });
    }

    // Check if product is already in the wishlist
    const productExists = wishlist.products.some(item => item.product.toString() === productId);
    if (productExists) {
      return res.status(200).json({ message: 'Product already in wishlist' });
    }

    // Add product to the wishlist
    wishlist.products.push({ product: productId });
    await wishlist.save();

    res.status(200).json({ message: 'Product added to wishlist', wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding product to wishlist' });
  }
});

// Route to remove product from wishlist
router.post('/remove-from-wishlist', auth, async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  try {
    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    // Remove the product from the wishlist
    wishlist.products = wishlist.products.filter(item => item.product.toString() !== productId);
    await wishlist.save();

    res.status(200).json({ message: 'Product removed from wishlist', wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error removing product from wishlist' });
  }
});

// Route to get user's wishlist
router.get('/', auth, async (req, res) => {
  const userId = req.user._id;
  try {
    const wishlist = await Wishlist.findOne({ user: userId }).populate('products.product');

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    res.status(200).json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching wishlist' });
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - images
 *       properties:
 *         name:
 *           type: string
 *         price:
 *           type: number
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         rating:
 *           type: number
 *     Wishlist:
 *       type: object
 *       required:
 *         - user
 *         - products
 *       properties:
 *         user:
 *           type: string
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *               productName:
 *                 type: string
 *               productImage:
 *                 type: string
 *               productPrice:
 *                 type: number
 */

/**
 * @swagger
 * /wishlist/add-to-wishlist:
 *   post:
 *     summary: Add a product to the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product to add
 *     responses:
 *       200:
 *         description: Product added to wishlist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wishlist'
 *       404:
 *         description: Product not found
 *       400:
 *         description: Product already in wishlist
 *       500:
 *         description: Error adding product to wishlist
 */

/**
 * @swagger
 * /wishlist/remove-from-wishlist:
 *   post:
 *     summary: Remove a product from the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product to remove
 *     responses:
 *       200:
 *         description: Product removed from wishlist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wishlist'
 *       404:
 *         description: Wishlist not found
 *       500:
 *         description: Error removing product from wishlist
 */

/**
 * @swagger
 * /wishlist:
 *   get:
 *     summary: Get the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: The user's wishlist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wishlist'
 *       404:
 *         description: Wishlist not found
 *       500:
 *         description: Error fetching wishlist
 */

module.exports = router;
