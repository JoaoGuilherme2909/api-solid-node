import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { RegisterUseCase } from "@/use-cases/register";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(req.body);

  try {
    const authenticateUseCase = new AuthenticateUseCase(
      new PrismaUsersRepository()
    );

    await authenticateUseCase.execute({
      email,
      password,
    });
  } catch (err) {
    if (err instanceof InvalidCredentialsError)
      return res.status(400).send({ message: err.message });

    throw err;
  }

  return res.status(200).send();
}
