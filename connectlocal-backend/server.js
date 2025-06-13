const fastify = require("fastify")({ logger: true });
const fastifyMysql = require("fastify-mysql");
const userRoutes = require("./routes/userRoutes");

fastify.register(fastifyMysql, {
  promise: true, // usa pool com promises/async-await
  host: "localhost",
  user: "root",
  password: "3412",
  database: "connectlocal",
  connectionLimit: 10,
});

fastify.register(userRoutes);

fastify.get("/test-db", async (request, reply) => {
  const conn = await fastify.mysql.getConnection();
  const [rows] = await conn.query("SELECT 1 + 1 AS result");
  conn.release();
  return rows;
});

fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log("Server rodando em http://localhost:3000");
});
