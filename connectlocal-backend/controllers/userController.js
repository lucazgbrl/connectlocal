const userModel = require("../models/userModel");

async function getUsers(request, reply) {
  const users = await userModel.getAllUsers(request.server);
  return users;
}

async function getUser(request, reply) {
  const id = request.params.id;
  console.log("Buscando usuário com ID:", id);
  const user = await userModel.getUserById(request.server, Number(id));
  console.log("Resultado da busca:", user);
  if (!user) {
    return reply.status(404).send({ error: "User not found" });
  }
  return user;
}

async function addUser(request, reply) {
  const { full_name, email, password } = request.body;
  const newUser = await userModel.addUser(request.server, {
    full_name,
    email,
    password,
  });
  reply.status(201).send(newUser);
}

async function updateUser(request, reply) {
  const id = request.params.id;
  const data = request.body;

  // Garantir que mandou pelo menos 1 campo
  if (!data || Object.keys(data).length === 0) {
    return reply
      .status(400)
      .send({ error: "Nenhum campo enviado para atualizar" });
  }

  const user = await userModel.getUserById(request.server, id);
  if (!user) {
    return reply.status(404).send({ error: "User not found" });
  }

  const updatedUser = await userModel.updateUser(request.server, id, data);
  return updatedUser;
}

async function deleteUser(request, reply) {
  const id = request.params.id;
  const user = await userModel.getUserById(request.server, id);
  if (!user) {
    return reply.status(404).send({ error: "User not found" });
  }
  await userModel.deleteUser(request.server, id);
  return reply.status(204).send({ message: "User deleted successfully" });
}

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
};
