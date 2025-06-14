async function getAllUsers(fastify) {
  const conn = await fastify.mysql.getConnection();
  const [rows] = await conn.query("SELECT * FROM users");
  conn.release();
  return rows;
}

async function getUserById(fastify, id) {
  const conn = await fastify.mysql.getConnection();
  const [rows] = await conn.query("SELECT * FROM users WHERE id = ?", [id]);
  conn.release();
  return rows[0];
}

async function createUser(fastify, userData) {
  const conn = await fastify.mysql.getConnection();

  try {
    await conn.beginTransaction();

    const { full_name, email, password, user_type } = userData;

    // Validação mínima
    if (!full_name || !email || !password || !user_type) {
      return { error: "Missing required user fields" };
    }

    // 1. Cria usuário base
    const [userResult] = await conn.query(
      "INSERT INTO users (full_name, email, password, user_type) VALUES (?, ?, ?, ?)",
      [full_name, email, password, user_type]
    );

    const userId = userResult.insertId;

    // 2. Se for lojista, insere na tabela merchants
    if (user_type === "merchant") {
      const { business_name = null, phone = null, address = null } = userData;

      await conn.query(
        "INSERT INTO merchants (user_id, business_name, phone, address) VALUES (?, ?, ?, ?)",
        [userId, business_name, phone, address]
      );
    }

    // 3. Se for consumidor, insere na tabela consumers
    if (user_type === "consumer") {
      const { phone = null } = userData;

      await conn.query("INSERT INTO consumers (user_id, phone) VALUES (?, ?)", [
        userId,
        phone,
      ]);
    }

    await conn.commit();

    return { id: userId, ...userData };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

async function updateUser(fastify, id, fieldsToUpdate) {
  const conn = await fastify.mysql.getConnection();

  // Monta SET dinâmico
  const keys = Object.keys(fieldsToUpdate);
  const values = Object.values(fieldsToUpdate);

  if (keys.length === 0) {
    conn.release();
    return null;
  }

  const setClause = keys.map((key) => `${key} = ?`).join(", ");

  const [result] = await conn.query(
    `UPDATE users SET ${setClause} WHERE id = ?`,
    [...values, id]
  );

  conn.release();

  if (result.affectedRows === 0) {
    return null;
  }

  return { id, ...fieldsToUpdate };
}

async function deleteUser(fastify, id) {
  const conn = await fastify.mysql.getConnection();
  await conn.query("DELETE FROM users WHERE id = ?", [id]);
  conn.release();
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
