import { describe } from "node:test";
import { expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcrypt";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { Role } from "@prisma/client";

describe("Authenticate use case", () => {
  it("should be able to authenticate", async () => {
    const usersRepository = new InMemoryUserRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "johndoe@example",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    const usersRepository = new InMemoryUserRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await expect(() =>
      sut.execute({
        email: "johndoe@example",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    const usersRepository = new InMemoryUserRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example",
      password_hash: await hash("123456", 6),
      role: Role.MEMBER,
    });

    await expect(() =>
      sut.execute({
        email: "johndoe@example",
        password: "123123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
