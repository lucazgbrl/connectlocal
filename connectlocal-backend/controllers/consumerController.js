const consumerModel = require("../models/consumerModel");
const userModel = require("../models/userModel");

async function getConsumer(req, reply) {
  try {
    const { id } = req.params;
    const consumer = await consumerModel.getConsumerByUserId(req.server, id);

    if (!consumer) {
      return reply.status(404).send({ error: "Consumidor não encontrado" });
    }

    // Pega os dados do usuário associado ao consumidor
    const user = await userModel.getUserById(req.server, id);

    return reply.send({ ...consumer, user });
  } catch (err) {
    console.error("Erro ao buscar consumidor:", err);
    return reply.status(500).send({ error: "Erro interno" });
  }
}

async function updateConsumer(req, reply) {
  try {
    const { id } = req.params;
    const updated = await consumerModel.updateConsumer(
      req.server,
      id,
      req.body
    );

    if (!updated) {
      return reply
        .status(404)
        .send({ error: "Consumidor não encontrado ou nada foi alterado" });
    }

    return reply.send({ success: true });
  } catch (err) {
    console.error("Erro ao atualizar consumidor:", err);
    return reply.status(500).send({ error: "Erro interno" });
  }
}

module.exports = {
  getConsumer,
  updateConsumer,
};
