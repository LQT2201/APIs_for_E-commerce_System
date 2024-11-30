const mongoose = require('mongoose');

// Mô hình Discount (Chiết khấu)
const discountSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Tên chương trình giảm giá
    description: { type: String }, // Mô tả chương trình giảm giá
    discountType: { type: String, enum: ['percentage', 'fixed'], required: true }, // Loại giảm giá ('percentage' hoặc 'fixed')
    value: { type: Number, required: true }, // Giá trị giảm giá (theo phần trăm hoặc số tiền cụ thể)
    applicableTo: {
      type: String,
      enum: ['product', 'category', 'all'], // Đối tượng áp dụng: Sản phẩm, danh mục, hoặc đơn hàng
      required: true,
    },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Áp dụng cho sản phẩm (nếu applicableTo là 'product')
    category: { type: String }, // Áp dụng cho danh mục (nếu applicableTo là 'category')
    minOrderValue: { type: Number, default: 0 }, // Giá trị đơn hàng tối thiểu để áp dụng giảm giá (nếu applicableTo là 'order')
    startDate: { type: Date, default: Date.now }, // Ngày bắt đầu chương trình giảm giá
    endDate: { type: Date }, // Ngày kết thúc chương trình giảm giá (nếu có)
    isActive: { type: Boolean, default: true }, // Trạng thái kích hoạt
    maxUsage: { type: Number, default: 0 }, // Số lần tối đa có thể sử dụng chương trình giảm giá
    appliedCount: { type: Number, default: 0 }, // Số lần đã áp dụng giảm giá
  },
  { timestamps: true }
);

// Kiểm tra xem giảm giá có hợp lệ không
discountSchema.methods.isValid = function () {
  const now = new Date();
  console.log(this)
  return this.isActive && ( now <= this.endDate) && (this.maxUsage === 0 || this.appliedCount < this.maxUsage);
};

const Discount = mongoose.model('Discount', discountSchema);

module.exports = Discount;
