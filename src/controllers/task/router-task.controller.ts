import { FastifyInstance } from "fastify";
import { createTaskController } from "./create-task-controller";
import { deleteTaskController } from "./delete-task-controller";

export async function routerTaskController(app: FastifyInstance) {
  app.post("/task", createTaskController);
  app.delete("/task", deleteTaskController);
}
