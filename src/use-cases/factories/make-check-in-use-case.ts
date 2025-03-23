import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserMetricsUseCase } from "../get-user-metrics";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { CheckInUseCase } from "../checkin";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeCheckInUseCase() {
  const useCase = new CheckInUseCase(
    new PrismaCheckInsRepository(),
    new PrismaGymsRepository(),
  );
  return useCase;
}
