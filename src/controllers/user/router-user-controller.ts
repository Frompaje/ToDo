import { FastifyInstance } from "fastify";
import { createUserController } from "./create-user-controller";
import { deleteUserController } from "./delete-user-controller";
import { getUserController } from "./get-user-controllers";

export async function routerUserController(app: FastifyInstance) {
  app.get("/user/:id", getUserController);
  app.post("/user", createUserController);
  app.delete("/user", deleteUserController);
}
