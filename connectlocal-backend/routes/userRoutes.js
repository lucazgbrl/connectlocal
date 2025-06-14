const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

async function userRoutes(fastify) {
  fastify.get("/users/:id", getUser);
  fastify.post("/users", createUser);
  fastify.put("/users/:id", updateUser);
  fastify.delete("/users/:id", deleteUser);
}

module.exports = userRoutes;
