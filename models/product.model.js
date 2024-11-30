// models/productVariation.js
const mongoose = require('mongoose');

// Mô hình ProductVariation (Biến thể sản phẩm)
const productVariationSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Liên kết đến sản phẩm chính
    sku: { type: String, required: true, unique: true },  // Mã sản phẩm (SKU) cho biến thể
    color: { type: String },  // Màu sắc của biến thể
    size: { type: String },  // Kích thước của biến thể
    price: { type: Number, required: true },  // Giá của biến thể
    stock: { type: Number, default: 0 },  // Số lượng tồn kho của biến thể
    image: { type: String },  // Hình ảnh của biến thể (nếu có)
  },
  { timestamps: true }
);

const ProductVariation = mongoose.model('ProductVariation', productVariationSchema);


// Mô hình Product (Sản phẩm chính)
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Tên sản phẩm
    description: { type: String, required: true }, // Mô tả sản phẩm
    mainImage: { type: String }, // Hình ảnh chính của sản phẩm
    thumbs: { type: [String] }, // Hình ảnh thu nhỏ của sản phẩm
    category: { type: String }, // Danh mục sản phẩm
    variations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariation' }], // Mảng các biến thể của sản phẩm
    stock: { type: Number, default: 0 }, // Tổng số lượng tồn kho của sản phẩm (tính từ các biến thể)
    rating: { type: Number, default: 0 }, // Đánh giá trung bình của sản phẩm (1-5)
    sold: { type: Number, default: 0 }, // Số lượng sản phẩm đã bán
    discount: { type: mongoose.Schema.Types.ObjectId, ref: 'Discount' }, // Liên kết Discount
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = { Product, ProductVariation };
