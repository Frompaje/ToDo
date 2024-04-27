import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export async function routerUser(app: FastifyInstance) {
  app.post("/user", (req: FastifyRequest, rep: FastifyReply) => {
    rep.send("hello");
  });
}
