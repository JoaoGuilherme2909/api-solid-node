import { describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists";

describe("Register use Case", () => {
  it("should be able to register", async () => {
    const register = new RegisterUseCase(new InMemoryUserRepository());

    const { user } = await register.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password uppon registration", async () => {
    const register = new RegisterUseCase(new InMemoryUserRepository());

    const { user } = await register.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const register = new RegisterUseCase(new InMemoryUserRepository());

    const email = "johndoe@example.com";

    await register.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    await expect(() =>
      register.execute({
        name: "John Doe",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
