const express = require('express');
const CategoryController = require('../controllers/category.controller');
const router = express.Router();

/**
 * @openapi
 * /category/create:
 *   post:
 *     tags:
 *       - Category
 *     description: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the category (e.g., "Electronics")
 *               description:
 *                 type: string
 *                 description: Detailed description of the category (optional)
 *               parentCategory:
 *                 type: string
 *                 description: ID of the parent category (optional, default is null)
 *               image:
 *                 type: string
 *                 description: URL or path to the category image (optional)
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the created category
 *                 name:
 *                   type: string
 *                   description: Name of the category
 *                 description:
 *                   type: string
 *                   description: Description of the category
 *                 parentCategory:
 *                   type: string
 *                   description: Parent category ID (if any)
 *                 image:
 *                   type: string
 *                   description: Category image URL or path
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Timestamp when the category was created
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Timestamp when the category was last updated
 *       400:
 *         description: Bad request, invalid input data
 *       500:
 *         description: Internal server error
 */
router.post('/create', CategoryController.createCategory);

/**
 * @openapi
 * /category:
 *   get:
 *     tags:
 *       - Category
 *     description: Retrieve a list of all categories
 *     responses:
 *       200:
 *         description: A list of all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   parentCategory:
 *                     type: string
 *                   image:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal server error
 */
router.get('', CategoryController.getAllCategory);

/**
 * @openapi
 * /category/{categoryId}:
 *   get:
 *     tags:
 *       - Category
 *     description: Retrieve a category by its ID
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the category
 *     responses:
 *       200:
 *         description: A single category object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 parentCategory:
 *                   type: string
 *                 image:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.get('/:categoryId', CategoryController.getCategoryById);

/**
 * @openapi
 * /category/{categoryId}/update:
 *   post:
 *     tags:
 *       - Category
 *     description: Update an existing category by ID
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               parentCategory:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Bad request, invalid input data
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.post('/:categoryId/update', CategoryController.updateCategory);

/**
 * @openapi
 * /category/{categoryId}/delete:
 *   post:
 *     tags:
 *       - Category
 *     description: Delete a category by ID
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the category to delete
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.post('/:categoryId/delete', CategoryController.deleteCategory);

module.exports = router;
