const options = {
  failOnErrors: true,
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'IE307 APIs',
      version: '1.0.0',
      description: "API documentation for IE307 APIs", // Mô tả API
    },
    servers: [
      {
        // url: "http://localhost:3305", // URL của API server
        url: "https://ie-307-6017b574900a.herokuapp.com", // URL của API server
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'apiKey',  // Loại xác thực là API Key
          in: 'header',    // Đặt token trong header
          name: 'Authorization',  // Tên header là Authorization
          description: 'Enter your Bearer token',  // Mô tả ngắn cho người dùng
        },
      },
    },
    security: [
      {
        BearerAuth: [], // Áp dụng BearerAuth cho tất cả các API
      },
    ],
  },
  apis: ['./routes/*.js'], // Đảm bảo đường dẫn này trỏ tới các tệp định nghĩa API của bạn
};

module.exports = options;
