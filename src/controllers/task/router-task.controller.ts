import { FastifyInstance } from "fastify";
import { createTaskController } from "./create-task-controller";
import { deleteTaskController } from "./delete-task-controller";
import { updateTaskController } from "./update-task-controller";
import { getTaskController } from "./get-task-controller";
import { verifyJWT } from "../middlewares/verify-jwt";

export async function routerTaskController(app: FastifyInstance) {
  app.get("/task/:userId", { onRequest: [verifyJWT] }, getTaskController);
  app.post("/task", { onRequest: [verifyJWT] }, createTaskController);
  app.delete("/task", { onRequest: [verifyJWT] }, deleteTaskController);
  app.patch("/task", { onRequest: [verifyJWT] }, updateTaskController);
}
