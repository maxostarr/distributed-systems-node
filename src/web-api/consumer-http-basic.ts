import fastify from 'fastify';
import fetch from 'node-fetch';

const HOST = process.env.HOST || 'localhost';
const PORT = Number(process.env.PORT) || 3000;
const TARGET = process.env.TARGET || 'http://localhost:4000';

const server = fastify();

server.get('/', async (req, reply) => {
  const response = await fetch(`${TARGET}/recipes/42`);
  const producer_data = await response.json();
  return {
    consumer_pid: process.pid,
    producer_data
  };
});

server.listen({
  host: HOST,
  port: PORT,
}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Consumer running at http://${HOST}:${PORT}`);
});