const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserService = {
  /**
   * Register a new user
   * @param {Object} userData - Object containing user details
   * @returns {Promise<Object>} - Created user object
   */
  registerUser: async (userData) => {
    try {
      const password = userData.password
      if(!password) throw new Error("Khong co mat khau")
    
        const hashedPassword = await bcrypt.hash(userData.password, 5);

      const user = new User({
        ...userData,
        password:hashedPassword
      }); 
      await user.save();
      return user;
    } catch (error) {
      throw new Error(`Error registering user: ${error.message}`);
    }
  },

  /**
   * Login a user
   * @param {String} email - User email
   * @param {String} password - User password
   * @returns {Promise<Object>} - Object containing user and token
   */
  loginUser: async (email, password) => {
    try {
      const user = await User.findOne({ email })
      if (!user) throw new Error('User not found');

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error('Invalid credentials');

      const token = jwt.sign({ id: user._id, role: user.role }, "JWT_SECRET", { expiresIn: '24h' });
      return { user, token };
    } catch (error) {
      throw new Error(`Error logging in user: ${error.message}`);
    }
  },

  /**
   * Logout a user
   * @returns {Promise<String>} - Logout success message
   */
  logoutUser: async () => {
    try {
      // Logout logic depends on implementation (e.g., token blacklist)
      return 'Logout successful';
    } catch (error) {
      throw new Error(`Error logging out user: ${error.message}`);
    }
  },

  /**
   * Create a new user
   * @param {Object} userData - Object containing user details
   * @returns {Promise<Object>} - Created user object
   */
  createUser: async (userData) => {
    try {
      const user = new User(userData);
      await user.save();
      return user;
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  },

  /**
   * Find a user by ID
   * @param {String} userId - User ID
   * @returns {Promise<Object>} - Found user object
   */
  findUserById: async (userId) => {
    try {
      const user = await User.findById(userId);
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      throw new Error(`Error finding user: ${error.message}`);
    }
  },

  /**
   * Update user details
   * @param {String} userId - User ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object>} - Updated user object
   */
  updateUser: async (userId, updateData) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
        new: true, // Return the updated document
        runValidators: true, // Ensure validation rules are applied
      });
      if (!updatedUser) throw new Error('User not found');
      return updatedUser;
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  },

  /**
   * Delete a user by ID
   * @param {String} userId - User ID
   * @returns {Promise<Object>} - Deleted user object
   */
  deleteUser: async (userId) => {
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) throw new Error('User not found');
      return deletedUser;
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  },

  /**
   * Authenticate a user by email and password
   * @param {String} email - User email
   * @param {String} password - User password
   * @returns {Promise<Object>} - Authenticated user object
   */
  authenticateUser: async (email, password) => {
    try {
      const user = await User.findOne({ email }).select('+password'); // Include password in query
      if (!user) throw new Error('User not found');

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error('Invalid credentials');

      return user;
    } catch (error) {
      throw new Error(`Error authenticating user: ${error.message}`);
    }
  },

  /**
   * Get all users
   * @param {Object} filter - Filter options
   * @returns {Promise<Array>} - List of users
   */
  getAllUsers: async (filter = {}) => {
    try {
      return await User.find(filter);
    } catch (error) {
      throw new Error(`Error retrieving users: ${error.message}`);
    }
  },
};

module.exports = UserService;
