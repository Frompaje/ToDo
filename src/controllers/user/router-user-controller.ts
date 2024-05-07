import { FastifyInstance } from "fastify";
import { createUserController } from "./create-user-controller";
import { deleteUserController } from "./delete-user-controller";
import { getUserController } from "./get-user-controllers";
import { loginUserController } from "./login-user-controller";
import { verifyJWT } from "../middlewares/verify-jwt";

export async function routerUserController(app: FastifyInstance) {
  app.get("/user/:id", getUserController);
  app.get("/login", loginUserController);
  app.post("/user", createUserController);
  app.delete("/user", deleteUserController);
}

// tenho que fazer o login, uma das ideias é passar pelo jwt
