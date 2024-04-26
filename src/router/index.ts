import { TaskController } from "@/controllers/created-task-controllers";
import { UserControllers } from "@/controllers/created-user-controllers";
import { Router } from "express";

const router = Router();

const createTaskControllers = new TaskController();
const createdUserController = new UserControllers();

router.post("/", createTaskControllers.created);
router.post("/user", createdUserController.createUser);
export { router };
