import { FastifyInstance } from "fastify";
import { createTaskController } from "./create-task-controller";
import { deleteTaskController } from "./delete-task-controller";
import { updateTaskController } from "./update-task-controller";

export async function routerTaskController(app: FastifyInstance) {
  app.post("/task", createTaskController);
  app.delete("/task", deleteTaskController);
  app.patch("/task", updateTaskController);
}
