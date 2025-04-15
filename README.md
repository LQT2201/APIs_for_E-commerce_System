# API-IE307 - Backend API for E-commerce System 🛒

**API-IE307** is a RESTful backend API designed for an e-commerce platform. Built using Node.js and Express, this API facilitates managing products, orders, users, and other essential operations. It supports functionalities such as user registration, login, product management, order processing, cart handling, and discount applications.

## **Key Features** 🌟

-   **User Management**: Handles user registration, login, authentication, and profile management.
-   **Product Management**: Manage product listings, categories, and discounts.
-   **Order Processing**: Place orders, update order status, and track order history.
-   **Cart System**: Add, update, and remove items from the shopping cart, and calculate the total price.
-   **Discount System**: Apply discount codes to orders for discounted pricing.
-   **Address Management**: Manage user shipping and billing addresses.

## **API Endpoints** 📍

### **User Management** 👤
-   **POST /api/users/register**: Register a new user.
-   **POST /api/users/login**: Log in a user and return authentication token.
-   **GET /api/users/profile**: Fetch user profile information.
-   **PUT /api/users/profile**: Update user profile data.

### **Product Management** 📦
-   **GET /api/products**: Retrieve all products.
-   **GET /api/products/:id**: Retrieve a single product by ID.
-   **POST /api/products**: Create a new product.
-   **PUT /api/products/:id**: Update an existing product by ID.
-   **DELETE /api/products/:id**: Delete a product by ID.

### **Cart Management** 🛒
-   **GET /api/cart**: Retrieve the user's cart.
-   **POST /api/cart**: Add an item to the cart.
-   **PUT /api/cart**: Update the quantity of an item in the cart.
-   **DELETE /api/cart**: Remove an item from the cart.

### **Order Management** 🚚
-   **POST /api/orders**: Create a new order.
-   **GET /api/orders/:id**: Retrieve order details by ID.
-   **GET /api/orders/track/:trackingNumber**: Track an order by its tracking number.

### **Address Management** 🏠
-   **POST /api/address**: Add a new address.
-   **GET /api/address**: Retrieve all addresses for a user.
-   **PUT /api/address/:id**: Update an address by ID.
-   **DELETE /api/address/:id**: Delete an address by ID.

### **Discount Management** 🏷️
-   **POST /api/discounts**: Create a new discount code.
-   **GET /api/discounts**: Retrieve all discount codes.
-   **POST /api/discounts/apply**: Apply a discount code to an order.

## **Technologies Used** 💻

-   **Node.js**: JavaScript runtime used for building the server-side API.
-   **Express.js**: Web application framework for Node.js, used for building RESTful APIs.
-   **MongoDB**: NoSQL database for storing product, order, user, and address data.
-   **JWT (JSON Web Tokens)**: Secure method for authentication and authorization.
-   **Bcrypt.js**: Used for securely hashing passwords and comparing them during authentication.

## **Installation and Setup** 🛠️

### **Prerequisites**
Make sure you have the following installed:
-   **Node.js** (LTS version recommended): [Download Node.js](https://nodejs.org/)
-   **MongoDB**: Install MongoDB locally or use a cloud database service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

## Installation and Setup

1.  Clone this repository:

    ```bash
    git clone [https://github.com/LQT2201/API-IE307.git](https://github.com/LQT2201/API-IE307.git)
    ```

2.  Navigate to the project directory:

    ```bash
    cd API-IE307
    ```

3.  Install dependencies:

    ```bash
    npm install
    ```

4.  Set up your MongoDB instance and create a `.env` file in the root directory with the following variables:

    ```plaintext
    DB_URI=mongodb://localhost:27017/yourdbname
    JWT_SECRET=your_jwt_secret
    ```

5.  Run the application:

    ```bash
    npm start
    ```

    The backend server will be running at http://localhost:3050.

## Testing the API 🔍

You can test the API using tools like Postman or Insomnia.

## License 📜

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/license/mit/) file for details.

## Acknowledgments 🙏

* MongoDB: Used for data storage.
* Express.js: Web framework that simplifies API development.
* JWT: Used for secure user authentication.

### Explanation of Sections:

1.  **Main Features**: Describes the key features of the API, like user management, product handling, etc.
2.  **API Endpoints**: Lists all available endpoints along with their functionality.
3.  **Technologies Used**: Details the technologies used in the backend API.
4.  **Installation and Setup**: Instructions for setting up the project locally, including installation steps and environment variable setup.
5.  **License**: Specifies the licensing (MIT License in this case).
6.  **Acknowledgments**: Credits the technologies used in the project.

This **README.md** file provides a complete guide for users to set up and interact with your **API-IE307** project.
