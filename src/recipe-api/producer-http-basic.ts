import fastify from "fastify";

const server = fastify();
const HOST = process.env.HOST || "localhost";
const PORT = Number(process.env.PORT) || 4000;

console.log(`worker pid=${process.pid}`);

function asserts_has_id(object: any): asserts object is { id: string } {
  if (typeof object !== "object" || object === null) {
    throw new Error("object must be an object");
  }

  if (typeof object.id !== "string") {
    throw new Error("object must have an id");
  }
}

server.get("/recipes/:id", async (req, reply) => {
  console.log(`worker request pid=${process.pid}`);
  asserts_has_id(req.params);
  const id = Number(req.params.id);
  if (id !== 42) {
    reply.statusCode = 404;
    return { error: "not_found" };
  }
  return {
    producer_pid: process.pid,
    recipe: {
      id,
      name: "Chicken Tikka Masala",
      steps: "Throw it in a pot...",
      ingredients: [
        { id: "1", name: "Chicken", quantity: "1 lb" },
        { id: "2", name: "Sauce", quantity: "2 cups" },
      ],
    },
  };
});

server.listen(
  {
    host: HOST,
    port: PORT,
  },
  (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Producer running at http://${HOST}:${PORT}`);
  },
);
