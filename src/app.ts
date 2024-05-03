import fastify, { FastifyInstance } from "fastify";
import { routerUserController } from "./controllers/user/router-user-controller";
import { routerTaskController } from "./controllers/task/router-task.controller";

export const app: FastifyInstance = fastify();

app.register(routerUserController);
app.register(routerTaskController);
