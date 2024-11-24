import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcrypt";
import { UserAlreadyExistsError } from "./errors/user-already-exists";
import { User } from "@prisma/client";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface registerUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    name,
    password,
  }: RegisterUseCaseRequest): Promise<registerUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      email,
      name,
      password_hash,
    });

    return { user };
  }
}
