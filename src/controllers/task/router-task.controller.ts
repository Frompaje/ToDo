import { FastifyInstance } from "fastify";
import { createTaskController } from "./create-task-controller";

export async function routerTaskController(app: FastifyInstance) {
  app.post("/task", createTaskController);
}
