export interface UserRepository {
  create(email: string, password: string): Promise<User>;
  delete(id: string): Promise<User>;
}

export type User = {
  id: string;
  email: string;
  password: string;
  created_at: Date;
};
