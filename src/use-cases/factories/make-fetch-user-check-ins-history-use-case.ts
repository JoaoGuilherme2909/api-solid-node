import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { FetchUsersCheckInsHistoryUseCase } from "../fetch-user-check-ins-history";

export function makeFetchUserCheckInsHistoryUseCase() {
  const useCase = new FetchUsersCheckInsHistoryUseCase(
    new PrismaCheckInsRepository(),
  );

  return useCase;
}
