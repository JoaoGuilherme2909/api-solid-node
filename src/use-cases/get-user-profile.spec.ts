import { describe } from "node:test";
import { expect, it } from "vitest";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcrypt";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

describe("Authenticate use case", () => {
  it("should be able to get user profile", async () => {
    const usersRepository = new InMemoryUserRepository();
    const sut = new GetUserProfileUseCase(usersRepository);

    const createdUser = await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to get user profile with wrong id", async () => {
    const usersRepository = new InMemoryUserRepository();
    const sut = new GetUserProfileUseCase(usersRepository);

    await expect(() =>
      sut.execute({
        userId: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
