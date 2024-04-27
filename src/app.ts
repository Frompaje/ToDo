import fastify, { FastifyInstance } from "fastify";
import { routerUser } from "./http/router/user-router";

export const app: FastifyInstance = fastify();

app.register(routerUser);
