import { prisma } from "../config/db";
import { z } from "zod";

interface iUser {
  email: string;
  password: string;
  created_at: string;
}

export class User {
  async createUser(input: iUser, req: Request) {
    const registerBodySchema = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const { email, password } = registerBodySchema.parse(req.body);

    await prisma.user.create({
      data: {
        email,
        password,
      },
    });
  }
}
