import { FastifyInstance } from "fastify";
import { createUserController } from "./create-user-controller";
import { deleteUserController } from "./delete-user-controller";

export async function routerUserController(app: FastifyInstance) {
  app.post("/user", createUserController);
  app.delete("/user", deleteUserController);
}
