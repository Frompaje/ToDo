export interface UserRepository {
  create(email: string, name: string): Promise<User>;
  delete(id: string): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
}

export type User = {
  id: string;
  email: string;
  created_at: Date;
};
