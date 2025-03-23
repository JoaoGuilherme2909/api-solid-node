import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CreateGymUseCase } from "../create-gym";

export function makeCreateGymUseCase() {
  const useCase = new CreateGymUseCase(new PrismaGymsRepository());

  return useCase;
}
