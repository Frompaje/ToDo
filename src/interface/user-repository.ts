import { User } from "./type-user.js";

export interface UserRepository {
  create(email: string, name: string): Promise<User | undefined>;
  delete(id: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}
