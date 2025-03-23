import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms";

export function makeFetchNearbyGymsUseCase() {
  const useCase = new FetchNearbyGymsUseCase(new PrismaGymsRepository());

  return useCase;
}
