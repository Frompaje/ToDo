export interface TaskResitory {
  create(email: string, password: string): Promise<User>;
  delete(userId: string, userTask: string): Promise<User>;
}

export type User = {
  id: string;
  email: string;
  password: string;
  created_at: Date;
};
