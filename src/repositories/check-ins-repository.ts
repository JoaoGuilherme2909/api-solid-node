import { CheckIn, Prisma } from "@prisma/client";
import { promises } from "dns";

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>;
  countByUserId(userId: string): Promise<number>;
  findById(checkInId: string): Promise<CheckIn>;
  save(checkIn: CheckIn): Promise<CheckIn>;
}
