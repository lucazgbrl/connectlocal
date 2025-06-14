async function getConsumerByUserId(fastify, userId) {
  const conn = await fastify.mysql.getConnection();
  const [rows] = await conn.query("SELECT * FROM consumers WHERE user_id = ?", [
    userId,
  ]);
  conn.release();
  return rows[0] || null;
}

async function updateConsumer(fastify, userId, updates) {
  const conn = await fastify.mysql.getConnection();

  const keys = Object.keys(updates);
  const values = Object.values(updates);

  if (keys.length === 0) {
    conn.release();
    return null;
  }

  const setClause = keys.map((key) => `${key} = ?`).join(", ");

  const [result] = await conn.query(
    `UPDATE consumers SET ${setClause} WHERE user_id = ?`,
    [...values, userId]
  );

  conn.release();

  return result.affectedRows > 0;
}

module.exports = {
  getConsumerByUserId,
  updateConsumer,
  findConsumerByName,
};
