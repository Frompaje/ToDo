import { User } from "./type-user.js";

export interface UserRepository {
  create(email: string, name: string, token: number): Promise<User>;
  delete(id: string): Promise<User>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
}
