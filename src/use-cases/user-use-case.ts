import { User, UserCreate } from "@/interfaces/user-interface";
import { UserRepositoryPrisma } from "@/repositories/user-create-repositories";

class UserUsecase {
  constructor(private UserRepository: UserRepositoryPrisma) {
    this.UserRepository = new UserRepositoryPrisma();
  }
  async create({ email, password }: UserCreate): Promise<User> {}
}
