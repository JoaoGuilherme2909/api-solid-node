import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists";
import { makeCheckInUseCase } from "@/use-cases/factories/make-check-in-use-case";
import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case";
import { makeValidateCheckInUseCase } from "@/use-cases/factories/make-validate-check-ins-use-case";
import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify/types/request";
import { z } from "zod";

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validateCheckInParamsSchema.parse(request.params);

  const validateCheckInUseCase = makeValidateCheckInUseCase();

  await validateCheckInUseCase.execute({
    checkInId,
  });

  return reply.status(204).send();
}
