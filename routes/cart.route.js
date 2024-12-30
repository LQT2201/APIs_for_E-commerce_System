const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cart.controller');
const auth = require('../middlewares/auth.middleware');

/**
 * @openapi
 * /cart:
 *   get:
 *     tags:
 *       - Cart
 *     description: Get the user's shopping cart (requires login)
 *     security:
 *       - BearerAuth: []  # Yêu cầu Bearer token để xác thực người dùng
 *     responses:
 *       200:
 *         description: Successfully retrieved the user's cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       sku:
 *                         type: string
 *                         description: The SKU of the product
 *                       quantity:
 *                         type: integer
 *                         description: The quantity of the product in the cart
 *                       productId:
 *                         type: string
 *                         description: The unique identifier of the product
 *                       name:
 *                         type: string
 *                         description: The name of the product
 *                       price:
 *                         type: number
 *                         format: float
 *                         description: The price of the product
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       500:
 *         description: Internal server error
 */
router.get('/', auth, CartController.getCart);


/**
 * @openapi
 * /cart/add:
 *   post:
 *     tags:
 *       - Cart
 *     description: Add a product to the shopping cart (requires login)
 *     security:
 *       - BearerAuth: []  # Yêu cầu Bearer token để xác thực người dùng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sku:
 *                 type: string
 *                 description: The SKU of the product being added to the cart
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product to be added
 *               productId:
 *                 type: string
 *                 description: The unique identifier of the product to be added
 *             required:
 *               - sku
 *               - quantity
 *               - productId
 *     responses:
 *       200:
 *         description: Product successfully added to the cart
 *       400:
 *         description: Bad request, invalid input data
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       500:
 *         description: Internal server error
 */
router.post('/add', auth, CartController.addToCart);

/**
 * @openapi
 * /cart/update:
 *   post:
 *     tags:
 *       - Cart
 *     description: Update a product in the shopping cart (requires login)
 *     security:
 *       - BearerAuth: []  # Yêu cầu Bearer token để xác thực người dùng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sku:
 *                 type: string
 *                 description: The SKU of the product to update
 *               quantity:
 *                 type: integer
 *                 description: The new quantity of the product
 *               productId:
 *                 type: string
 *                 description: The unique identifier of the product to update
 *             required:
 *               - sku
 *               - quantity
 *               - productId
 *     responses:
 *       200:
 *         description: Product successfully updated in the cart
 *       400:
 *         description: Bad request, invalid input data
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       500:
 *         description: Internal server error
 */
router.post('/update', auth, CartController.updateCartItem);

/**
 * @openapi
 * /cart/remove:
 *   post:
 *     tags:
 *       - Cart
 *     description: Remove a product from the shopping cart (requires login)
 *     security:
 *       - BearerAuth: []  # Yêu cầu Bearer token để xác thực người dùng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sku:
 *                 type: string
 *                 description: The SKU of the product to remove from the cart
 *               productId:
 *                 type: string
 *                 description: The unique identifier of the product to remove
 *             required:
 *               - sku
 *               - productId
 *     responses:
 *       200:
 *         description: Product successfully removed from the cart
 *       400:
 *         description: Bad request, invalid input data
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       500:
 *         description: Internal server error
 */
router.post('/remove', auth, CartController.removeCartItem);

module.exports = router;
