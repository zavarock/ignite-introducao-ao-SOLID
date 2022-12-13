import { User } from "../../model/User";
import { ICreateUserDTO, IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = Object.assign(new User(), { name, email });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    return this.users.find((user) => {
      return user.id === id;
    });
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((user) => {
      return user.email === email;
    });
  }

  turnAdmin(receivedUser: User): User {
    return Object.assign(receivedUser, {
      admin: true,
      updated_at: new Date(),
    });
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
