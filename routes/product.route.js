const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');

/**
 * @openapi
 * /product/create:
 *   post:
 *     tags:
 *      - Product
 *     description: Create a new clothing product with detailed variations such as size, color, and price.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               spu:
 *                 type: string
 *                 description: The unique identifier for the product.
 *               name:
 *                 type: string
 *                 description: The name of the product.
 *               description:
 *                 type: string
 *                 description: A detailed description of the product.
 *               category:
 *                 type: objectId
 *                 description: The category of the product, such as "Men's Fashion" or "Electronics".
 *               brand:
 *                 type: string
 *                 description: The brand name of the product.
 *               rating:
 *                 type: number
 *                 format: float
 *                 description: Average customer rating of the product.
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uri
 *                 description: URLs for images of the product.
 *               variations:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     sku:
 *                       type: string
 *                       description: The SKU (Stock Keeping Unit) for this variation of the product.
 *                     attributes:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           attributeName:
 *                             type: string
 *                             description: The attribute's name (e.g., "Size" or "Color").
 *                           values:
 *                             type: array
 *                             items:
 *                               type: string
 *                             description: Possible values for the attribute.
 *                     price:
 *                       type: number
 *                       description: The price for this specific product variation.
 *                     stockQuantity:
 *                       type: integer
 *                       description: The number of units available for this variation.
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                         format: uri
 *                       description: URLs for images of the specific variation.
 *                     features:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           featureName:
 *                             type: string
 *                             description: The name of the feature (e.g., "Material").
 *                           description:
 *                             type: string
 *                             description: The description of the feature (e.g., "Cotton 100%").
 *                     specifications:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           specName:
 *                             type: string
 *                             description: The name of the specification (e.g., "Color").
 *                           specValue:
 *                             type: string
 *                             description: The value of the specification (e.g., "Black").
 *     responses:
 *       201:
 *         description: Product created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                 product:
 *                   type: object
 *                   description: The newly created product data.
 *                   properties:
 *                     spu:
 *                       type: string
 *                       description: The unique identifier of the created product.
 *                     name:
 *                       type: string
 *                       description: The name of the created product.
 *                     price:
 *                       type: number
 *                       description: The price of the created product.
 *                     category:
 *                       type: objectId
 *                       description: The category of the product.
 *                     brand:
 *                       type: string
 *                       description: The brand name of the created product.
 *                     variations:
 *                       type: array
 *                       items:
 *                         type: object
 *                         description: A list of variations of the product (size, color, etc.).
 *       400:
 *         description: Invalid data provided, such as missing required fields or incorrect format.
 *       500:
 *         description: Internal server error occurred while creating the product.
 */
router.post('/create', ProductController.createProduct);


/**
 * @openapi
 * /product:
 *   get:
 *     tags:
 *      - Product
 *     description: Get all products
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   category:
 *                     type: string
 */
router.get('/', ProductController.getAllProduct);

/**
 * @openapi
 * /product/{productId}:
 *   get:
 *     tags:
 *      - Product
 *     description: Get product by ID
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *                 category:
 *                   type: string
 */
router.get('/:productId', ProductController.getProductById);

/**
 * @openapi
 * /product/{categoryId}/findByCate:
 *   get:
 *     tags:
 *      - Product
 *     description: Get products by category
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category
 *     responses:
 *       200:
 *         description: List of products in the category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   category:
 *                     type: string
 */
router.get('/:categoryId/findByCate', ProductController.getAllProductByCategory);

/**
 * @openapi
 * /product/{productId}/update:
 *   post:
 *     tags:
 *      - Product
 *     description: Update product details
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Product name
 *               price:
 *                 type: number
 *                 description: Product price
 *               category:
 *                 type: string
 *                 description: Product category
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
/**
 * @openapi
 * /product/{productId}/update:
 *   post:
 *     tags:
 *      - Product
 *     description: Update the details of an existing product, including variations such as size, color, and price.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to be updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               spu:
 *                 type: string
 *                 description: The unique identifier for the product.
 *               name:
 *                 type: string
 *                 description: The name of the product.
 *               description:
 *                 type: string
 *                 description: A detailed description of the product.
 *               category:
 *                 type: objectId
 *                 description: The category of the product, such as "Men's Fashion" or "Electronics".
 *               brand:
 *                 type: string
 *                 description: The brand name of the product.
 *               rating:
 *                 type: number
 *                 format: float
 *                 description: Average customer rating of the product.
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uri
 *                 description: URLs for images of the product.
 *               variations:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     sku:
 *                       type: string
 *                       description: The SKU (Stock Keeping Unit) for this variation of the product.
 *                     attributes:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           attributeName:
 *                             type: string
 *                             description: The attribute's name (e.g., "Size" or "Color").
 *                           values:
 *                             type: array
 *                             items:
 *                               type: string
 *                             description: Possible values for the attribute.
 *                     price:
 *                       type: number
 *                       description: The price for this specific product variation.
 *                     stockQuantity:
 *                       type: integer
 *                       description: The number of units available for this variation.
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                         format: uri
 *                       description: URLs for images of the specific variation.
 *                     features:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           featureName:
 *                             type: string
 *                             description: The name of the feature (e.g., "Material").
 *                           description:
 *                             type: string
 *                             description: The description of the feature (e.g., "Cotton 100%").
 *                     specifications:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           specName:
 *                             type: string
 *                             description: The name of the specification (e.g., "Color").
 *                           specValue:
 *                             type: string
 *                             description: The value of the specification (e.g., "Black").
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                 product:
 *                   type: object
 *                   description: The updated product data.
 *                   properties:
 *                     spu:
 *                       type: string
 *                       description: The unique identifier of the updated product.
 *                     name:
 *                       type: string
 *                       description: The name of the updated product.
 *                     price:
 *                       type: number
 *                       description: The price of the updated product.
 *                     category:
 *                       type: objectId
 *                       description: The category of the product.
 *                     brand:
 *                       type: string
 *                       description: The brand name of the updated product.
 *                     variations:
 *                       type: array
 *                       items:
 *                         type: object
 *                         description: A list of updated variations of the product (size, color, etc.).
 *       400:
 *         description: Invalid data provided, such as missing required fields or incorrect format.
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Internal server error occurred while updating the product.
 */
router.post('/:productId/update', ProductController.updateProduct);

/**
 * @swagger
 * /product/search:
 *   post:
 *     summary: Search for products based on multiple filters
 *     description: Allows searching for products by name, color, category, price range, or SKU.
 *     tags:
 *       - Product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product to search for (case-insensitive).
 *               category:
 *                 type: string
 *                 description: The category ID of the product to filter by.
 *               minPrice:
 *                 type: number
 *                 description: The minimum price of the product.
 *               maxPrice:
 *                 type: number
 *                 description: The maximum price of the product.
 *               color:
 *                 type: string
 *                 description: The color of the product to filter by.
 *               sku:
 *                 type: string
 *                 description: The SKU (product code) of the product to search for (case-insensitive).
 *     responses:
 *       200:
 *         description: A list of products that match the search criteria.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The product's unique identifier.
 *                       name:
 *                         type: string
 *                         description: The name of the product.
 *                       price:
 *                         type: number
 *                         description: The price of the product.
 *                       category:
 *                         type: string
 *                         description: The category of the product.
 *                       color:
 *                         type: string
 *                         description: The color of the product.
 *                       sku:
 *                         type: string
 *                         description: The SKU of the product.
 *                       image:
 *                         type: string
 *                         description: URL to the product image.
 *       400:
 *         description: Invalid request body or parameters.
 *       500:
 *         description: Internal server error.
 */
router.post('/search', ProductController.searchProduct);


module.exports = router;
