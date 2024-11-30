const express = require('express');
const discountController = require('../controllers/discount.controller');

const router = express.Router();

router.post('/', discountController.createDiscount);
router.get('/', discountController.getAllDiscounts);
router.get('/:id', discountController.getDiscountById);
router.put('/:id', discountController.updateDiscount);
router.delete('/:id', discountController.deleteDiscount);
router.get('/:id/validity', discountController.checkDiscountValidity);
router.post('/apply/:id', discountController.applyDiscount);


module.exports = router;
