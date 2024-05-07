import { FastifyInstance } from "fastify";
import { createUserController } from "./create-user-controller";
import { deleteUserController } from "./delete-user-controller";
import { getUserController } from "./get-user-controllers";
import { verifyJWT } from "../middlewares/verify-jwt";
import { getRefreshUserController } from "./refresh-token-user-controller";

export async function routerUserController(app: FastifyInstance) {
  app.get("/user/:id", getUserController);
  app.get("/refresh/:id", { onRequest: [verifyJWT] }, getRefreshUserController);
  app.post("/user", createUserController);
  app.delete("/user", deleteUserController);
}
