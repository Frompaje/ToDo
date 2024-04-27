export interface User {
  id: string;
  email: string;
  password: string;
  created_at: string;
}

export interface UserCreate {
  email: string;
  password: string;
}

export interface UserRepository {
  create(data: UserCreate): Promise<User>;
}
