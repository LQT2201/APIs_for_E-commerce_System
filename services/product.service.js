const Product = require('../models/product.model')

class ProductService {
    static async createProduct(productData) {
      try {
        const newProduct = new Product(productData)
        const savedProduct = await newProduct.save()
        return savedProduct
      } catch (error) {
        throw new Error('Lỗi khi tạo sản phẩm', error.message)
      }
    }

    static async getAllProduct() {
      try {
        return await Product.find()
      } catch (error) {
        throw new Error('Lỗi khi getAllProduct sản phẩm', error.message)
      }
    }

    static async getProductById(productId) {
      try {
        if(!productId) throw new Error('Không tìm thấy Id sản phẩm')
        return await Product.findById(productId)
      } catch (error) {
        throw new Error('Lỗi khi get One sản phẩm', error.message)
      }
    }

    static async updateProduct(productId,updateData) {
      try {
        if(!productId) throw new Error('Không tìm thấy Id sản phẩm')

        const updatedProduct = await Product.findByIdAndUpdate(
          productId,
          {$set:updateData},
          {new:true}
        )

        return updatedProduct
      } catch (error) {
        throw new Error('Lỗi khi get One sản phẩm', error.message)
      }
    }

    static async deleteProduct(productId) {
      try {
        if(!productId) throw new Error('Không tìm thấy Id sản phẩm')
        
        const deletedProduct = await Product.findByIdAndDelete(productId)
        return deletedProduct
      } catch (error) {
        throw new Error('Lỗi khi delete sản phẩm', error.message)
      }
    }

    static async getProductByCategory(categoryId){
      try {
        return await Product.find({
          category:categoryId
        }).populate('category')
      } catch (error) {
        throw new Error('Lỗi khi get sản phẩm by id', error.message)
      }
    }
}

module.exports = ProductService