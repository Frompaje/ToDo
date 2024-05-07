import { MailRepository } from "@/interface/mail-repository";
import { User, UserRepository } from "@/interface/user-repository";
import { token } from "@/repositories/mail/token";
import { FastifyReply } from "fastify";

export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private mailRepository: MailRepository
  ) {}

  async execute({ email, name, reply }: Input): Promise<Output> {
    const userExist = await this.userRepository.findByEmail(email);
    if (userExist) {
      throw new Error("Email already exists");
    }

    const user = await this.userRepository.create(email, name);

    const tokenValidated = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      }
    );
    if (!tokenValidated) {
      throw new Error("Token not exists");
    }
    console.log(tokenValidated);

    await this.mailRepository.send(email, token());

    return { user };
  }
}

type Input = {
  email: string;
  name: string;
  reply: FastifyReply;
};

type Output = {
  user: User;
};
