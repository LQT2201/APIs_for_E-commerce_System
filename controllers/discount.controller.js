const Discount = require("../models/discount.model")
const DiscountService = require("../services/discount.service")

class DiscountController {
  static async createDiscount(req,res) {
    const discountData = req.body
    try {

      const newDiscount = new Discount(discountData)

      if(!newDiscount) throw new Error("Deo tao duoc")

      const savedDiscount = await newDiscount.save()
      if(!savedDiscount) throw new Error("Deo luu duoc")

 
      return res.status(201).json({
        message:"Tạo discount thành công",
        data:savedDiscount
      }) 
    } catch (error) {
      return res.status(500).json({
        message:"Lỗi khi tạo discount controller",
        error
      })
    }
  }

  static async getAllDiscount(req,res) {
    try {
      const discounts = await DiscountService.getAllDiscount()
      return res.status(200).json({
        message:'Lấy tất cả discount thành công',
        data:discounts
      })
    } catch (error) {
      return res.status(500).json({
        message:"Lỗi khi tạo discount",
        error: error.message
      })
    }
  }

  static async getValidDiscount(req,res) {
    try {
      const discounts = await DiscountService.getAllValidDiscounts()
      return res.status(200).json({
        message:'Lấy tất cả valid discount thành công',
        data:discounts
      })
    } catch (error) {
      return res.status(500).json({
        message:"Lỗi khi get valid discount",
        error: error.message
      })
    }
  }

  static async applyDiscount(req,res) {
    const {cartTotal, discountCode} = req.body
    try {
      const newTotal = await DiscountService.applyDiscount(cartTotal, discountCode)
      return res.status(200).json(newTotal)
    } catch (error) {
      return res.status(500).json({
        message:"Lỗi khi ap udng discount",
        error: error.message
      })
    }
  }

  static async updateDiscount(req,res) {
    const updateData = req.body
    const {id} = req.params
    try {
      const newTotal = await DiscountService.updateDiscount(id, updateData)
      return res.status(200).json(newTotal)
    } catch (error) {
      return res.status(500).json({
        message:"Lỗi khi ap udng discount",
        error: error.message
      })
    }
  }
  
}

module.exports = DiscountController