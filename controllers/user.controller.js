const UserService = require('../services/user.service');

const UserController = {
  /**
   * Register a new user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  register: async (req, res) => {
    try {
      const user = await UserService.registerUser(req.body);
      res.status(201).json({ success: true, user });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  /**
   * Login a user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const { user, token } = await UserService.loginUser(email, password);
      res.status(200).json({ success: true, user, token });
    } catch (error) {
      res.status(401).json({ success: false, message: error.message });
    }
  },

  /**
   * Logout a user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  logout: async (req, res) => {
    try {
      const message = await UserService.logoutUser();
      res.status(200).json({ success: true, message });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  /**
   * Get a user by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  getUserById: async (req, res) => {
    try {
      const user = await UserService.findUserById(req.params.id);
      res.status(200).json({ success: true, user });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  },

  /**
   * Update a user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  updateUser: async (req, res) => {
    try {
      const updatedUser = await UserService.updateUser(req.params.id, req.body);
      res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  /**
   * Delete a user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  deleteUser: async (req, res) => {
    try {
      const deletedUser = await UserService.deleteUser(req.params.id);
      res.status(200).json({ success: true, user: deletedUser });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  },

  /**
   * Get all users
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  getAllUsers: async (req, res) => {
    try {
      const users = await UserService.getAllUsers(req.query);
      res.status(200).json({ success: true, users });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
};

module.exports = UserController;