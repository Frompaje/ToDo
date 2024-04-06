import { TaskController } from "@/controllers/taskControllers";
import { Router } from "express";

const router = Router();

const taskControllers = new TaskController();

router.get("/", taskControllers.getTask);

router.post("/", taskControllers.created);

router.delete("/", taskControllers.delete);

router.patch("/", taskControllers.update);

export { router };
