import fastify, { FastifyInstance } from "fastify";
import { createTaskController } from "./controllers/task/create-task-controller";
import { createUserController } from "./controllers/user/create-user-controller";

export const app: FastifyInstance = fastify();

app.post("/task", createTaskController);

app.post("/user", createUserController);
