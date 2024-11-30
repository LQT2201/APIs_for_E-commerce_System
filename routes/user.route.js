const express = require('express');
const UserController = require('../controllers/user.controller');
const router = express.Router();

// Register a new user
router.post('/register', UserController.register);

// Login a user
router.post('/login', UserController.login);

// Logout a user
router.post('/logout', UserController.logout);

// Get a user by ID
router.get('/:id', UserController.getUserById);

// Update a user
router.put('/:id', UserController.updateUser);

// Delete a user
router.delete('/:id', UserController.deleteUser);

// Get all users
router.get('/', UserController.getAllUsers);

module.exports = router;
