const Discount = require('../models/discount.model');

// Service xử lý logic liên quan đến Discount
const discountService = {
  // Tạo Discount mới
  async createDiscount(data) {
    const discount = new Discount(data);
    return await discount.save();
  },

  // Lấy tất cả Discount (có thể thêm filter)
  async getAllDiscounts(filter = {}) {
    return await Discount.find(filter);
  },

  // Lấy Discount theo ID
  async getDiscountById(id) {
    return await Discount.findById(id);
  },

  // Cập nhật Discount theo ID
  async updateDiscount(id, updateData) {
    return await Discount.findByIdAndUpdate(id, updateData, { new: true });
  },

  // Xóa Discount theo ID
  async deleteDiscount(id) {
    return await Discount.findByIdAndDelete(id);
  },

  // Kiểm tra Discount có hợp lệ không
  async isDiscountValid(id) {
    const discount = await Discount.findById(id);
    console.log(discount,'ádf')
    if (!discount) return false;
    return discount.isValid();
  },

  // Apply discount to an order or cart
  async applyDiscount (discountId, orderTotal)  {
    try {
      console.log(orderTotal)
      const discount = await Discount.findById(discountId);

      if (discount && discount.isValid()) {
        // Check if the discount has reached its usage limit
        if (discount.maxUsage > 0 && discount.appliedCount >= discount.maxUsage) {
          return { success: false, message: 'Số lần sử dụng giảm giá đã hết' }; // Discount usage limit reached
        }

        // Calculate the discount value based on the discount type
        let discountAmount = 0;
        if (discount.discountType === 'percentage') {
          discountAmount = (discount.value / 100) * orderTotal; // Apply percentage discount
        } else if (discount.discountType === 'fixed') {
          discountAmount = discount.value; // Apply fixed amount discount
        }

        // Ensure the discount doesn't exceed the order total
        if (discountAmount > orderTotal) {
          discountAmount = orderTotal;
        }

        // Apply the discount to the order total
        const newOrderTotal = orderTotal - discountAmount;

        // Increment the applied count in the database
        discount.appliedCount += 1;
        await discount.save();

        return {
          success: true,
          message: `Giảm giá áp dụng thành công. Giảm giá: ${discountAmount} VND`,
          newOrderTotal,
        };
      } else {
        return { success: false, message: 'Giảm giá không hợp lệ hoặc hết hạn' };
      }
    } catch (error) {
      console.error('Error applying discount:', error);
      return { success: false, message: 'Đã xảy ra lỗi trong quá trình áp dụng giảm giá' };
    }
  }
};

module.exports = discountService;
