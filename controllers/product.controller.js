const ProductService = require('../services/product.service');

class ProductController {
  /**
   * Create multiple products (with variations) via a POST request
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async createMultipleProducts(req, res) {
    try {
      const productsData = req.body; // Expecting an array of products with variations
      const result = await ProductService.createProducts(productsData);
      res.status(200).json({ success: true, message: result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Tạo mới sản phẩm với các biến thể
  static async createProduct(req, res) {
    try {
      const productData = req.body;
      const product = await ProductService.createProduct(productData);
      res.status(201).json({ success: true, product });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Lấy danh sách sản phẩm
  static async getProducts(req, res) {
    try {
      const products = await ProductService.getProducts();
      res.status(200).json({ success: true, products });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Lấy danh sách sản phẩm
  static async getProductsWithDiscount(req, res) {
    try {
      const products = await ProductService.getAllProducts();
      res.status(200).json({ success: true, products });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

   // Lấy danh sách sản phẩm
   static async getProductsWithVariations(req, res) {
    try {
      const product = await ProductService.getProductWithVariations();
      res.status(200).json({ success: true, product });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }


  // Lấy thông tin sản phẩm theo ID
  static async getProductById(req, res) {
    try {
      const { productId } = req.params;
      const product = await ProductService.getProductById(productId);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Sản phẩm không tồn tại' });
      }
      res.status(200).json({ success: true, product });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Lấy thông tin sản phẩm theo ID bao gom variation va gia final
  static async getProductWithDetailsById(req, res) {
    try {
      const { productId } = req.params;
      const product = await ProductService.getProductWithDetails(productId);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Sản phẩm không tồn tại' });
      }
      res.status(200).json({ success: true, product });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Lấy thông tin sản phẩm kèm các biến thể
  static async getProductWithVariations(req, res) {
    try {
      const { productId } = req.params;
      const product = await ProductService.getProductWithVariation(productId);
      res.status(200).json({ success: true, product });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Cập nhật thông tin sản phẩm
  static async updateProduct(req, res) {
    try {
      const { productId } = req.params;
      const productData = req.body;
      const updatedProduct = await ProductService.updateProduct(productId, productData);
      res.status(200).json({ success: true, updatedProduct });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Xóa sản phẩm
  static async deleteProduct(req, res) {
    try {
      const { productId } = req.params;
      const result = await ProductService.deleteProduct(productId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = ProductController;
