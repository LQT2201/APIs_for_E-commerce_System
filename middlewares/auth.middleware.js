const jwt = require('jsonwebtoken');
const UserService = require('../services/user.service'); // Dùng để lấy thông tin người dùng từ DB nếu cần

/**
 * Auth middleware để xác thực người dùng
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Callback để chuyển sang middleware tiếp theo
 */
const auth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');  // Lấy token từ header
   
  if (!token) {
    return res.status(401).json({ success: false, message: 'Không có token, yêu cầu xác thực người dùng' });
  }

  try {
    // Giải mã token và lấy thông tin người dùng
    const decoded = jwt.verify(token, "JWT_SECRET");  // JWT_SECRET là khóa bí mật để giải mã token
    console.log(decoded)
    // Kiểm tra nếu người dùng tồn tại trong cơ sở dữ liệu
    const user = await UserService.findUserById(decoded.id);
    if (!user) {
      throw new Error('Người dùng không tồn tại');
    }

    // Lưu thông tin người dùng vào request để dùng cho các middleware tiếp theo
    req.user = user;
    next();  // Tiến hành với middleware tiếp theo
  } catch (error) {
    res.status(401).json({ success: false, message: 'Token không hợp lệ hoặc hết hạn' });
  }
};

module.exports = auth;
