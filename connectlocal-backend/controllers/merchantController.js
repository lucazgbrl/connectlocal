const merchantModel = require("../models/merchantModel");

async function getMerchant(req, reply) {
  try {
    const { id } = req.params;
    const merchant = await merchantModel.getMerchantByUserId(req.server, id);

    if (!merchant) {
      return reply.status(404).send({ error: "Lojista não encontrado" });
    }

    return reply.send(merchant);
  } catch (err) {
    console.error("Erro ao buscar lojista:", err);
    return reply.status(500).send({ error: "Erro interno" });
  }
}

async function updateMerchant(req, reply) {
  try {
    const { id } = req.params;
    const updated = await merchantModel.updateMerchant(
      req.server,
      id,
      req.body
    );

    if (!updated) {
      return reply
        .status(404)
        .send({ error: "Lojista não encontrado ou nada foi alterado" });
    }

    return reply.send({ success: true });
  } catch (err) {
    console.error("Erro ao atualizar lojista:", err);
    return reply.status(500).send({ error: "Erro interno" });
  }
}

module.exports = {
  getMerchant,
  updateMerchant,
};
