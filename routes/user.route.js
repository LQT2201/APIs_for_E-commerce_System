const express = require('express');
const UserController = require('../controllers/user.controller');
const router = express.Router();

/**
 * @openapi
 * /user/register:
 *   post:
 *     tags:
 *       - User
 *     summary: Register a new user to the system
 *     description: Register a new user to the system with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The unique username of the user
 *               email:
 *                 type: string
 *                 description: The user's email address
 *               password:
 *                 type: string
 *                 description: The password for the user's account
 *               role:
 *                 type: string
 *                 description: The role of the user (e.g., "user", "admin")
 *               isActive:
 *                 type: boolean
 *                 description: Indicates whether the user account is active
 *               address:
 *                 type: string
 *                 description: User address  
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Bad request, invalid input data
 *       500:
 *         description: Internal server error
 */
router.post('/register', UserController.register);


/**
 * @openapi
 * /user/login:
 *   post:
 *     tags:
 *       - User
 *     summary: Log in a user to the system
 *     description: Authenticates a user using email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user
 *               password:
 *                 type: string
 *                 description: The password for the user's account
 *     responses:
 *       200:
 *         description: User successfully logged in
 *       400:
 *         description: Bad request, invalid input data
 *       401:
 *         description: Unauthorized, invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post('/login', UserController.login);


/**
 * @openapi
 * /user/logout:
 *   post:
 *     tags:
 *       - User
 *     summary: Log out a user from the system
 *     description: Logs the user out of the system and invalidates their session.
 *     responses:
 *       200:
 *         description: User successfully logged out
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/logout', UserController.logout);


/**
 * @openapi
 * /user/{id}:
 *   get:
 *     tags:
 *       - User
 *     summary: Get a user by ID
 *     description: Retrieve the user details by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details successfully retrieved
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', UserController.getUserById);


/**
 * @openapi
 * /user/{id}:
 *   put:
 *     tags:
 *       - User
 *     summary: Update user information
 *     description: Update the user details such as username, email, and role.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the user
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The updated username
 *               email:
 *                 type: string
 *                 description: The updated email address
 *               role:
 *                 type: string
 *                 description: The updated role of the user
 *               isActive:
 *                 type: boolean
 *                 description: Whether the user's account is active
 *               address:
 *                 type:string
 *     responses:
 *       200:
 *         description: User successfully updated
 *       400:
 *         description: Bad request, invalid input data
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', UserController.updateUser);


/**
 * @openapi
 * /user/{id}:
 *   delete:
 *     tags:
 *       - User
 *     summary: Delete a user by ID
 *     description: Delete a user from the system by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User successfully deleted
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', UserController.deleteUser);


/**
 * @openapi
 * /user:
 *   get:
 *     tags:
 *       - User
 *     summary: Get all users
 *     description: Retrieve a list of all users in the system.
 *     responses:
 *       200:
 *         description: List of all users successfully retrieved
 *       500:
 *         description: Internal server error
 */
router.get('/', UserController.getAllUsers);


module.exports = router;
