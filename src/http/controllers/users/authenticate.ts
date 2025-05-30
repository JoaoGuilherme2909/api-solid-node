import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticater-use-case";

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(req.body);

  try {
    const { user } = await makeAuthenticateUseCase().execute({
      email,
      password,
    });

    const token = await res.jwtSign(
      {
        role: user.role,
      },
      { sign: { sub: user.id } },
    );

    const refreshToken = await res.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          expiresIn: "7d",
          sub: user.id,
        },
      },
    );

    return res
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token });
  } catch (err) {
    if (err instanceof InvalidCredentialsError)
      return res.status(400).send({ message: err.message });
    throw err;
  }
}
