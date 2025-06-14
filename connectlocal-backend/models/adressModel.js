async function createAddress(server, user_id, data) {
  const conn = await server.mysql.getConnection();
  const {
    label,
    street,
    number,
    neighborhood,
    city,
    state,
    zip_code,
    latitude,
    longitude,
  } = data;

  const [result] = await conn.query(
    `
    INSERT INTO addresses (
      user_id, label, street, number, neighborhood,
      city, state, zip_code, latitude, longitude
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
    [
      user_id,
      label,
      street,
      number,
      neighborhood,
      city,
      state,
      zip_code,
      latitude,
      longitude,
    ]
  );

  conn.release();
  return { id: result.insertId, ...data };
}

async function getAddressesByUser(server, user_id) {
  const conn = await server.mysql.getConnection();
  const [rows] = await conn.query(`SELECT * FROM addresses WHERE user_id = ?`, [
    user_id,
  ]);
  conn.release();
  return rows;
}
