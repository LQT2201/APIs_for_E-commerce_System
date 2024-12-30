/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API quản lý đơn hàng
 */

const express = require("express");
const OrderController = require("../controllers/orderController");
const auth = require("../middlewares/auth.middleware");

const router = express.Router();

/**
 * @swagger
 * /orders/create:
 *   post:
 *     summary: Tạo mới một đơn hàng
 *     description: Cho phép người dùng đã xác thực tạo đơn hàng mới.
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     sku:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *               shippingAddress:
 *                 type: object
 *                 properties:
 *                   addressLine:
 *                     type: string
 *                   ward:
 *                     type: string
 *                   city:
 *                     type: string
 *                   country:
 *                     type: string
 *               paymentMethod:
 *                 type: string
 *               discountCode:
 *                 type: string
 *     responses:
 *       201:
 *         description: Đơn hàng được tạo thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       401:
 *         description: Người dùng chưa đăng nhập
 *       500:
 *         description: Lỗi hệ thống
 */
router.post("/create", auth, OrderController.createOrder);

/**
 * @swagger
 * /orders/{orderId}/update:
 *   post:
 *     summary: Cập nhật đơn hàng
 *     description: Cho phép người dùng đã xác thực cập nhật trạng thái đơn hàng.
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của đơn hàng cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: Trạng thái mới của đơn hàng
 *     responses:
 *       200:
 *         description: Đơn hàng được cập nhật thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       401:
 *         description: Người dùng chưa đăng nhập
 *       404:
 *         description: Không tìm thấy đơn hàng
 *       500:
 *         description: Lỗi hệ thống
 */
router.post("/:orderId/update", OrderController.updateOrder);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Lấy tất cả đơn hàng của người dùng
 *     description: Truy xuất danh sách đơn hàng của người dùng đã xác thực.
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Danh sách đơn hàng
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         productId:
 *                           type: string
 *                         sku:
 *                           type: string
 *                         quantity:
 *                           type: integer
 *                         price:
 *                           type: number
 *                         totalPrice:
 *                           type: number
 *                   totalPrice:
 *                     type: number
 *                   status:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Người dùng chưa đăng nhập
 *       500:
 *         description: Lỗi hệ thống
 */


router.get("/user-order",auth, OrderController.getUserOrder);

router.get("/:id", OrderController.getOrderById);
router.get("/", OrderController.getAllOrder);



module.exports = router;
