const consumerController = require("../controllers/consumerController");

async function consumerRoutes(fastify, options) {
  fastify.get("/consumers/:id", consumerController.getConsumer);
  fastify.patch("/consumers/:id", consumerController.updateConsumer);
}

module.exports = consumerRoutes;
