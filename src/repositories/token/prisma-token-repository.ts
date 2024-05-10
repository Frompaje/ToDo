import { prisma } from "@/database/db";
import { TokenRepository } from "@/interface/token-repository";
import { User } from "@/interface/type-user";

export class PrismaTokenRepository implements TokenRepository {
  async saveOTP(token: number, id: string): Promise<User> {
    const fiveMinutesInSecondFuture = Date.now() + 1000 * 60 * 5;
    return prisma.user.update({
      where: {
        id,
      },
      data: {
        token,
        tokenExpiresAt: new Date(fiveMinutesInSecondFuture),
      },
    });
  }
}
