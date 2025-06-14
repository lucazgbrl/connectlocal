const userModel = require("../models/userModel");

async function createUser(req, reply) {
  try {
    const result = await userModel.createUser(req.server, req.body);

    if (result.error) {
      return reply.status(400).send({ error: result.error });
    }

    return reply.status(201).send(result);
  } catch (err) {
    console.error("Erro ao criar usuário:", err);
    return reply.status(500).send({ error: "Erro interno" });
  }
}

async function getUser(req, reply) {
  try {
    const id = req.params.id;
    const user = await userModel.getUserById(req.server, id);

    if (!user) {
      return reply.status(404).send({ error: "Usuário não encontrado" });
    }

    return reply.send(user);
  } catch (err) {
    console.error("Erro ao buscar usuário:", err);
    return reply.status(500).send({ error: "Erro interno" });
  }
}

async function updateUser(req, reply) {
  try {
    const id = req.params.id;
    const user = await userModel.getUserById(req.server, id);

    if (!user) {
      return reply.status(404).send({ error: "Usuário não encontrado" });
    }

    const result = await userModel.updateUser(req.server, id, req.body);

    return reply.send(result);
  } catch (err) {
    console.error("Erro ao atualizar usuário:", err);
    return reply.status(500).send({ error: "Erro interno" });
  }
}

async function deleteUser(req, reply) {
  try {
    const id = req.params.id;
    const deleted = await userModel.deleteUser(req.server, id);

    if (!deleted) {
      return reply.status(404).send({ error: "Usuário não encontrado" });
    }

    return reply.status(204).send(); // Sem conteúdo
  } catch (err) {
    console.error("Erro ao deletar usuário:", err);
    return reply.status(500).send({ error: "Erro interno" });
  }
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
