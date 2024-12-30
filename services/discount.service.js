const Discount = require("../models/discount.model")

class DiscountService{
  static async createDiscount(discountData) {
    try {

        const newDiscount = new Discount(discountData)

        if(!newDiscount) throw new Error("Deo tao duoc")

        const savedDiscount = await newDiscount.save()
        if(!savedDiscount) throw new Erro("Deo luu duoc")

        return savedDiscount
    } catch (error) {
      throw new Error('Lỗi khi tạo discount',error)
    }
  }

  static async getAllDiscount(){
    try {
      return await Discount.find()
    } catch (error) {
      throw new Error("Lỗi khi lấy tất cả discount")
    }
  }

  static async getAllValidDiscounts() {
    try {
      const currentDate = new Date(); // Ngày hiện tại
  
      // Lọc các discount hợp lệ
      const validDiscounts = await Discount.find({
        isActive: true, // Chỉ lấy các discount đang hoạt động
        startDate: { $lte: currentDate }, // startDate <= currentDate
        endDate: { $gte: currentDate }, // endDate >= currentDate
        $or: [
          { usageLimit: { $exists: false } }, // Không có giới hạn sử dụng
          { $expr: { $gt: ["$usageLimit", "$usedCount"] } }, // usageLimit > usedCount
        ],
      });
  
      return validDiscounts;
    } catch (error) {
      throw new Error("Lỗi khi lấy các discount hợp lệ");
    }
  }
  

  static async getDiscountByCode(code){
    try {
      return await Discount.findOne({code})
    } catch (error) {
      throw new Error("Lỗi khi lấy  discount by code")
    }
  }

  static async applyDiscount (cartTotal, discountCode) {
    try {
      // Step 1: Find the discount code in the database
      const discount = await Discount.findOne({ code: discountCode });
  
      if (!discount) {
        return {
          success: false,
          message: 'Invalid discount code.',
          newTotal: cartTotal,
        };
      }
  
      // Step 2: Validate the discount
      const currentDate = new Date();
  
      if (!discount.isActive) {
        return {
          success: false,
          message: 'This discount code is no longer active.',
          newTotal: cartTotal,
        };
      }
  
      if (currentDate < discount.startDate || currentDate > discount.endDate) {
        return {
          success: false,
          message: 'This discount code is not valid at this time.',
          newTotal: cartTotal,
        };
      }
  
      if (discount.usedCount >= discount.usageLimit) {
        return {
          success: false,
          message: 'This discount code has reached its usage limit.',
          newTotal: cartTotal,
        };
      }
  
      if (cartTotal < discount.minOrderAmount) {
        return {
          success: false,
          message: `The minimum order amount for this discount is ${discount.minOrderAmount}.`,
          newTotal: cartTotal,
        };
      }
  
      // Step 3: Calculate the discount amount
      const discountAmount = discount.discountAmount*cartTotal/100;
      const newTotal = cartTotal - discountAmount;
  
      // Ensure the new total is not negative
      const finalTotal = Math.max(newTotal, 0);
  
      // Step 4: Update the usage count of the discount
      discount.usedCount += 1;
      await discount.save();
  
      // Step 5: Return the result
      return {
        success: true,
        message: 'Discount applied successfully.',
        discountAmount,
        newTotal: finalTotal,
      };
    } catch (error) {
      console.error('Error applying discount:', error);
      return {
        success: false,
        message: 'An error occurred while applying the discount.',
        newTotal: cartTotal,
      };
    }
  };

  // 3. Cập nhật discount
  static async updateDiscount(id, updateData) {
    try {
      const updatedDiscount = await Discount.findByIdAndUpdate(id, updateData, {
        new: true, // Trả về discount đã được cập nhật
      });

      if (!updatedDiscount) {
        throw new Error('Không tìm thấy discount với ID này');
      }

      return updatedDiscount;
    } catch (error) {
      console.error('Lỗi khi cập nhật discount:', error);
      throw new Error('Lỗi khi cập nhật discount');
    }
  }
}

module.exports = DiscountService