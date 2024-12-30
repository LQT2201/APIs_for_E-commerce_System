const Product = require('../models/product.model')
const removeAccents = require("remove-accents");

class ProductService {
    static async createProduct(productData) {
      try {
        const newProduct = new Product(productData);
        const savedProduct = await newProduct.save();
        return savedProduct;
      } catch (error) {
        // Log the error to make debugging easier
        console.error("Error creating product:", error);
    
        // Throw a new error with a descriptive message
        throw new Error(`Lỗi khi tạo sản phẩm: ${error.message}`);
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

    static async searchProduct(searchQuery) {
      const query = {};
    
      if (searchQuery.name) {
        query.$text = { $search: searchQuery.name };
      }
    
      // Tìm kiếm theo danh mục
      if (searchQuery.category) {
        query.category = searchQuery.category;
      }
    
      // Tìm kiếm theo khoảng giá
      if (searchQuery.minPrice || searchQuery.maxPrice) {
        query.price = {};
        if (searchQuery.minPrice) query.price.$gte = parseFloat(searchQuery.minPrice);
        if (searchQuery.maxPrice) query.price.$lte = parseFloat(searchQuery.maxPrice);
      }

      const products = await Product.find(query, {
        score: { $meta: 'textScore' } // Lấy metadata text score
      }).sort({ score: { $meta: 'textScore' } }); // Sắp xếp theo mức độ phù hợp
    
      return products;
    }
    
}

module.exports = ProductService