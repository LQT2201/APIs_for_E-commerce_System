const ProductService = require('../services/product.service')

class ProductController {
  static async createProduct(req, res) {
    const productData = req.body
    try {
      const newProduct = await ProductService.createProduct(productData)
      return res.status(201).json({
        message:'Tạo sản phẩm thành công',
        product:newProduct
      })
    } catch (error) {
      return res.status(500).json({
        message:'Lỗi khi tạo sản phẩm',
        error: error.message
      })
    }
  }

  static async getAllProduct(req,res){
    try {
      const allProduct  = await ProductService.getAllProduct()
      return res.status(200).json({
        message:"Lấy danh sách sản phẩm",
        data: allProduct
      })
    } catch (error) {
      return res.status(500).json({
        message:'Lỗi khi getAllProduct',
        error: error.message
      })
    }
  }

  static async getProductById(req, res) {
    const {productId} = req.params
    try {
      const product = await ProductService.getProductById(productId)

      return res.status(200).json({
        message:'Lấy sản phẩm theo Id thành công',
        data:product
      })
    } catch (error) {
      return res.status(500).json({
        message:'Lỗi khi getAllProduct',
        error: error.message
      })
    }
  }

  static async updateProduct(req,res) {
    const {productId} = req.params
    const {updateData} = req.body
    try {
      const updatedProduct = await ProductService.updateProduct(productId,updateData)

      return res.status(201).json({
        message:"Cập nhật sản phẩm thành công",
        data: updatedProduct
      })
    } catch (error) {
      return res.status(500).json({
        message:'Lỗi khi update product',
        error: error.message
      })
    }
  }

  static async deleteProductById(req, res){
    const {productId} = req.params
    try {
      const deletedProduct = await ProductService.deleteProduct(productId)
      return res.status(200).json({
        message:"Xóa sản phẩm thành công",
        data:deletedProduct
      })
    } catch (error) {
      return res.status(500).json({
        message:'Lỗi khi delete product',
        error: error.message
      })
    }
  }

  static async getAllProductByCategory(req,res) {
    const {categoryId} = req.params
    try {
      const productsByCategory = await ProductService.getProductByCategory(categoryId)
      return res.status(200).json({
        message:'Lấy sản phẩm theo category thành công',
        data:productsByCategory
      })
    } catch (error) {
      return res.status(500).json({
        message:'Lỗi khi get all product by category',
        error: error.message
      })
    }
  }
}

module.exports = ProductController