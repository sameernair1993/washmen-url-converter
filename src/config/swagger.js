const swaggerOptions = Object.freeze({
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Washmen URL conversion service",
      version: "1.0.0",
      description:
        "A simple service that converts http links to deeplinks and back",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Washmen",
        url: "https://no-reply.com",
        email: "info@email.com",
      },
    },
  },
  apis: ["src/**/*.js"]
});

module.exports = swaggerOptions;