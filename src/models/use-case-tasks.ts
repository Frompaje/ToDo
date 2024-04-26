import { z } from "zod";
import { prisma } from "../config/db";

interface iTask {
  id: string;
  title: string;
  description: string;
  status: string;
}

export class Tasks {
  async createTask(input: iTask, req: Request) {
    const registerBodySchema = z.object({
      title: z.string(),
      description: z.string(),
      status: z.string(),
      userID: z.
    });

    const { title, description, status } = registerBodySchema.parse(req.body);

    await prisma.task.create({
      data: {
        title,
        description,
        status,
      },
    });
  }
}
