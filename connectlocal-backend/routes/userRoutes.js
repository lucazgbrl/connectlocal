const {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

async function userRoutes(fastify) {
  fastify.get("/users", getUsers);
  fastify.get("/users/:id", getUser);
  fastify.post("/users", addUser);
  fastify.put("/users/:id", updateUser);
  fastify.delete("/users/:id", deleteUser);
}

module.exports = userRoutes;
