import fastify, { FastifyInstance } from "fastify";
import { routerUserController } from "./controllers/user/router-user-controller";
import { routerTaskController } from "./controllers/task/router-task.controller";
import cors from "@fastify/cors";

export const app: FastifyInstance = fastify();
app.register(cors);

app.register(routerUserController);
app.register(routerTaskController);
