const OrderService = require("../services/order.services");

class OrderController{
  static async createOrder(req,res) {
    const userId = req.user._id
    const orderData = req.body  
    try {
      if(!userId) throw new Error("Không có userId hợp lệ")
      if(!orderData) throw new Error("Không có orderData hợp lệ")
      
      const savedOrder = await OrderService.createOrder(userId,orderData)

      return res.status(201).json({
        message:'Tạo đơn hàng thành công',
        data: savedOrder
      })

    } catch (error) {
      return  res.status(500).json({
        message:'Lỗi khi tạo đơn hàng',
        error:error.message
      })
    }
  }

  static async updateOrder(req,res) {
    const {updateData} = req.body 
    const {orderId} = req.params 
    try {
      const savedOrder = await OrderService.updateOrder(orderId, updateData)

      return res.status(200).json({
        message:'Update đơn hàng thành công',
        data: savedOrder
      })

    } catch (error) {
      return  res.status(500).json({
        message:'Lỗi khi update đơn hàng',
        error:error.message
      })
    }
  }

  static async getAllOrder(req,res){
    try {
      const orders = await OrderService.getAllOrder()
      return res.status(200).json({
        message:"Lấy all đơn hàng thành công",
        data:orders
      })
    } catch (error) {
      return  res.status(500).json({
        message:'Lỗi khi get all đơn hàng',
        error:error.message
      })
    }
  }

  static async getOrderById(req,res) {
    const {id} = req.params
    try {
      const order = await OrderService.getOrderById(id)
      return res.status(200).json({
        message:'lay don hàng bang id thành công',
        data:order
      })
    } catch (error) {
      return  res.status(500).json({
        message:'Lỗi khi lay đơn hàng by id dd',
        error:error.message
      })
    }
  }

  static async getUserOrder(req,res) {
    const userId = req.user._id;  
    try {
      const orders = await OrderService.getUserOrder(userId)
      return res.status(200).json({
        message:'lay don hàng nguoi dung thành công',
        data:orders
      })
    } catch (error) {
      return  res.status(500).json({
        message:'Lỗi khi lay don hang nguoi dung',
        error:error.message
      })
    }
  }

  static async deleteOrder(req,res){
    const {orderId} = req.params
    try {
      const deletedOrder = await OrderService.deleteOrder(orderId)
      return res.status(200).json({
        message:'Xóa đơn hàng thành công',
        data:deletedOrder
      })
    } catch (error) {
      return  res.status(500).json({
        message:'Lỗi khi delete đơn hàng',
        error:error.message
      })
    }
  }
}

module.exports =  OrderController ;
