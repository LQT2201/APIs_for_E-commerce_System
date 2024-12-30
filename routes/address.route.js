const express = require('express');
const router = express.Router();
const AddressController = require('../controllers/address.controller');
const auth = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Addresses
 *   description: Address management API
 */

/**
 * @swagger
 * /addresses:
 *   post:
 *     summary: Create a new address
 *     description: Allows authenticated users to create a new address.
 *     tags: [Addresses]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: The address to be created.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               street:
 *                 type: string
 *               city:
 *                 type: string
 *               country:
 *                 type: string
 *               postalCode:
 *                 type: string
 *     responses:
 *       201:
 *         description: Address created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/', auth, AddressController.create); // Tạo địa chỉ mới

/**
 * @swagger
 * /addresses:
 *   get:
 *     summary: Get all addresses of the authenticated user
 *     description: Retrieves a list of all addresses for the authenticated user.
 *     tags: [Addresses]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of addresses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                   city:
 *                     type: string
 *                   country:
 *                     type: string
 *                   postalCode:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/', auth, AddressController.getByUser); 

/**
 * @swagger
 * /addresses/{addressId}:
 *   get:
 *     summary: Get a specific address by ID
 *     description: Retrieve a specific address using its ID.
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: addressId
 *         required: true
 *         description: The ID of the address
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A single address
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 street:
 *                   type: string
 *                 city:
 *                   type: string
 *                 country:
 *                   type: string
 *                 postalCode:
 *                   type: string
 *       400:
 *         description: Invalid address ID
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/:addressId', auth, AddressController.getById); // Lấy địa chỉ cụ thể

/**
 * @swagger
 * /addresses/{addressId}:
 *   put:
 *     summary: Update an existing address
 *     description: Update the details of an existing address by its ID.
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: addressId
 *         required: true
 *         description: The ID of the address to update
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: The address details to be updated.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               street:
 *                 type: string
 *               city:
 *                 type: string
 *               country:
 *                 type: string
 *               postalCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Address updated successfully
 *       400:
 *         description: Invalid input or address ID
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.put('/:addressId', auth, AddressController.update); // Cập nhật địa chỉ

/**
 * @swagger
 * /addresses/{addressId}:
 *   delete:
 *     summary: Delete an address by ID
 *     description: Delete a specific address using its ID.
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: addressId
 *         required: true
 *         description: The ID of the address to delete
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       204:
 *         description: Address deleted successfully
 *       400:
 *         description: Invalid address ID
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.delete('/:addressId', auth, AddressController.delete); // Xóa địa chỉ

/**
 * @swagger
 * /addresses/default/{addressId}:
 *   post:
 *     summary: Set a specific address as the default address
 *     description: Set a specific address as the default address for the user.
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: addressId
 *         required: true
 *         description: The ID of the address to set as default
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Address set as default successfully
 *       400:
 *         description: Invalid address ID
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/default/:addressId', auth, AddressController.setDefault); // Đặt địa chỉ mặc định

module.exports = router;
