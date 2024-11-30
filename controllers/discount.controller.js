const discountService = require('../services/discount.service');

// Controller xử lý request liên quan đến Discount
const discountController = {
  // Tạo Discount mới
  async createDiscount(req, res) {
    try {
      const discount = await discountService.createDiscount(req.body);
      res.status(201).json({ success: true, data: discount });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Lấy danh sách tất cả Discount
  async getAllDiscounts(req, res) {
    try {
      const filter = req.query || {}; // Lấy query filter nếu có
      const discounts = await discountService.getAllDiscounts(filter);
      res.status(200).json({ success: true, data: discounts });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Lấy Discount theo ID
  async getDiscountById(req, res) {
    try {
      const { id } = req.params;
      const discount = await discountService.getDiscountById(id);
      if (!discount) {
        return res.status(404).json({ success: false, message: 'Discount not found' });
      }
      res.status(200).json({ success: true, data: discount });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Cập nhật Discount theo ID
  async updateDiscount(req, res) {
    try {
      const { id } = req.params;
      const discount = await discountService.updateDiscount(id, req.body);
      if (!discount) {
        return res.status(404).json({ success: false, message: 'Discount not found' });
      }
      res.status(200).json({ success: true, data: discount });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Xóa Discount theo ID
  async deleteDiscount(req, res) {
    try {
      const { id } = req.params;
      const discount = await discountService.deleteDiscount(id);
      if (!discount) {
        return res.status(404).json({ success: false, message: 'Discount not found' });
      }
      res.status(200).json({ success: true, message: 'Discount deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Kiểm tra Discount có hợp lệ không
  async checkDiscountValidity(req, res) {
    try {
      const { id } = req.params;
      const isValid = await discountService.isDiscountValid(id);
      res.status(200).json({ success: true, isValid });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Kiểm tra Discount có hợp lệ không
  async applyDiscount(req, res) {
    try {
      const { id } = req.params;
      const {totalOrder} = req.body
      
      const discount = await discountService.applyDiscount(id,totalOrder);
      res.status(200).json({ success: true, discount });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

module.exports = discountController;
