const express = require('express');
const router = express.Router();
const DiscountController = require('../controllers/discount.controller');
const auth = require('../middlewares/auth.middleware');
/**
 * @swagger
 * tags:
 *   name: Discounts
 *   description: Discount management API
 */

/**
 * @swagger
 * /discount/create:
 *   post:
 *     summary: Create a new discount
 *     tags: [Discounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "SUMMER10"
 *               description:
 *                 type: string
 *                 example: "10% off on all orders above 1,000,000 VND"
 *               discountAmount:
 *                 type: number
 *                 example: 10
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-01T00:00:00Z"
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-06-30T23:59:59Z"
 *               minOrderAmount:
 *                 type: number
 *                 example: 1000000
 *               usageLimit:
 *                 type: number
 *                 example: 200
 *     responses:
 *       201:
 *         description: Discount created successfully
 *       400:
 *         description: Bad request
 */
router.post('/create', DiscountController.createDiscount);

/**
 * @swagger
 * /discount:
 *   get:
 *     summary: Retrieve all discounts
 *     tags: [Discounts]
 *     responses:
 *       200:
 *         description: A list of discounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "641a3c2e9f9b1b3b6f2a24d1"
 *                   code:
 *                     type: string
 *                     example: "SUMMER10"
 *                   description:
 *                     type: string
 *                     example: "10% off on all orders above 1,000,000 VND"
 *                   discountAmount:
 *                     type: number
 *                     example: 10
 *                   startDate:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-01-01T00:00:00Z"
 *                   endDate:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-06-30T23:59:59Z"
 *                   minOrderAmount:
 *                     type: number
 *                     example: 1000000
 *                   usageLimit:
 *                     type: number
 *                     example: 200
 *                   usedCount:
 *                     type: number
 *                     example: 50
 */
router.get('/', DiscountController.getAllDiscount);

/**
 * @swagger
 * /discount/apply:
 *   post:
 *     summary: Apply a discount code
 *     tags: [Discounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartTotal:
 *                 type: number
 *                 example: 1000000
 *               discountCode:
 *                 type: string
 *                 example: "SUMMER10"
 *     responses:
 *       200:
 *         description: Discount applied successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Discount applied successfully."
 *                 discountAmount:
 *                   type: number
 *                   example: 100000
 *                 newTotal:
 *                   type: number
 *                   example: 900000
 *       400:
 *         description: Bad request
 */
router.post('/apply', DiscountController.applyDiscount);

router.post('/:id/update', DiscountController.updateDiscount);

router.get('/valid', DiscountController.getValidDiscount);

module.exports = router;
