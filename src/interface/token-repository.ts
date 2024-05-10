import { User } from "./type-user";

export interface TokenRepository {
  saveOTP(token: number, id: string): Promise<User>;
}
