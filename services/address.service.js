const Address = require('../models/address.model'); // Import Address model

const AddressService = {
  // Tạo một địa chỉ mới
  async createAddress(data) {
    try {
      const newAddress = new Address(data);
      const savedAddress = await newAddress.save();
      return savedAddress;
    } catch (error) {
      throw new Error(`Lỗi khi tạo địa chỉ: ${error.message}`);
    }
  },

  // Lấy tất cả địa chỉ của một người dùng
  async getAddressesByUserId(userId) {
    try {
      const addresses = await Address.find({ userId }).sort({ isDefault: -1 }); // Sắp xếp mặc định lên trên cùng
      return addresses;
    } catch (error) {
      throw new Error(`Lỗi khi lấy danh sách địa chỉ: ${error.message}`);
    }
  },

  // Lấy một địa chỉ cụ thể theo ID
  async getAddressById(addressId) {
    try {
      const address = await Address.findById(addressId);
      if (!address) {
        throw new Error('Địa chỉ không tồn tại');
      }
      return address;
    } catch (error) {
      throw new Error(`Lỗi khi lấy địa chỉ: ${error.message}`);
    }
  },

  // Cập nhật một địa chỉ
  async updateAddress(addressId, data) {
    try {
      const updatedAddress = await Address.findByIdAndUpdate(addressId, data, {
        new: true, // Trả về bản ghi đã cập nhật
        runValidators: true, // Đảm bảo validate dữ liệu
      });
      if (!updatedAddress) {
        throw new Error('Địa chỉ không tồn tại');
      }
      return updatedAddress;
    } catch (error) {
      throw new Error(`Lỗi khi cập nhật địa chỉ: ${error.message}`);
    }
  },

  // Xóa một địa chỉ
  async deleteAddress(addressId) {
    try {
      const deletedAddress = await Address.findByIdAndDelete(addressId);
      if (!deletedAddress) {
        throw new Error('Địa chỉ không tồn tại');
      }
      return deletedAddress;
    } catch (error) {
      throw new Error(`Lỗi khi xóa địa chỉ: ${error.message}`);
    }
  },

  // Đặt một địa chỉ làm mặc định
  async setDefaultAddress(userId, addressId) {
    try {
      // Bỏ gắn cờ mặc định của các địa chỉ khác
      await Address.updateMany({ userId }, { isDefault: false });

      // Gắn cờ mặc định cho địa chỉ được chọn
      const updatedDefault = await Address.findByIdAndUpdate(
        addressId,
        { isDefault: true },
        { new: true }
      );

      if (!updatedDefault) {
        throw new Error('Địa chỉ không tồn tại');
      }
      return updatedDefault;
    } catch (error) {
      throw new Error(`Lỗi khi đặt địa chỉ mặc định: ${error.message}`);
    }
  },
};

module.exports = AddressService;
