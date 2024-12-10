const express = require('express')
const CategoryController = require('../controllers/category.controller')
const router = express.Router()

router.post('/create',CategoryController.createCategory)
router.get('',CategoryController.getAllCategory)
router.get('/:categoryId',CategoryController.getCategoryById)
router.post('/:categoryId/update',CategoryController.updateCategory)
router.post('/:categoryId/delete',CategoryController.deleteCategory)

module.exports = router