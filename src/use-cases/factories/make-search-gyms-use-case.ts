import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { FetchUsersCheckInsHistoryUseCase } from "../fetch-user-check-ins-history";
import { SearchGymsUseCase } from "../search-gyms";

export function makeSearchGymsUseCase() {
  const useCase = new SearchGymsUseCase(new PrismaGymsRepository());

  return useCase;
}
