const merchantController = require("../controllers/merchantController");

async function merchantRoutes(fastify, options) {
  fastify.get("/merchants/", merchantController.getMerchant);
  fastify.patch("/merchants/:id", merchantController.updateMerchant);
}

module.exports = merchantRoutes;
