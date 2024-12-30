const AddressService = require('../services/address.service');

const AddressController = {
  // Tạo địa chỉ
  async create(req, res) {
    try {
      const userId = req.user._id; // Lấy userId từ authenticated user
      const addressData = { ...req.body, userId }; // Gắn userId vào dữ liệu địa chỉ
      const address = await AddressService.createAddress(addressData);
      res.status(201).json(address);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Lấy tất cả địa chỉ của một người dùng
  async getByUser(req, res) {
    try {
      const userId = req.user._id; // Lấy userId từ authenticated user
      const addresses = await AddressService.getAddressesByUserId(userId);
      res.json(addresses);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Lấy một địa chỉ cụ thể
  async getById(req, res) {
    try {
      const { addressId } = req.params;
      const userId = req.user._id; // Lấy userId từ authenticated user
      const address = await AddressService.getAddressById(addressId);

      // Kiểm tra xem địa chỉ có thuộc về user hiện tại không
      if (address.userId.toString() !== userId.toString()) {
        return res.status(403).json({ error: 'Bạn không có quyền truy cập địa chỉ này' });
      }

      res.json(address);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  // Cập nhật địa chỉ
  async update(req, res) {
    try {
      const { addressId } = req.params;
      const userId = req.user._id; // Lấy userId từ authenticated user
      const existingAddress = await AddressService.getAddressById(addressId);

      // Kiểm tra quyền sở hữu trước khi cập nhật
      if (existingAddress.userId.toString() !== userId.toString()) {
        return res.status(403).json({ error: 'Bạn không có quyền cập nhật địa chỉ này' });
      }

      const updatedAddress = await AddressService.updateAddress(addressId, req.body);
      res.json(updatedAddress);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Xóa địa chỉ
  async delete(req, res) {
    try {
      const { addressId } = req.params;
      const userId = req.user._id; // Lấy userId từ authenticated user
      const existingAddress = await AddressService.getAddressById(addressId);

      // Kiểm tra quyền sở hữu trước khi xóa
      if (existingAddress.userId.toString() !== userId.toString()) {
        return res.status(403).json({ error: 'Bạn không có quyền xóa địa chỉ này' });
      }

      const deletedAddress = await AddressService.deleteAddress(addressId);
      res.json(deletedAddress);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Đặt địa chỉ mặc định
  async setDefault(req, res) {
    try {
      const { addressId } = req.params;
      const userId = req.user._id; // Lấy userId từ authenticated user

      // Kiểm tra xem địa chỉ có thuộc về user hiện tại không
      const existingAddress = await AddressService.getAddressById(addressId);
      if (existingAddress.userId.toString() !== userId.toString()) {
        return res.status(403).json({ error: 'Bạn không có quyền thay đổi địa chỉ này' });
      }

      const updatedDefault = await AddressService.setDefaultAddress(userId, addressId);
      res.json(updatedDefault);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = AddressController;
