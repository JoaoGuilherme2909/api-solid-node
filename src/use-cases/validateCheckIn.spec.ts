import { beforeEach, expect, it, vi, describe, afterEach } from "vitest";
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./checkin";
import { string } from "zod";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins";
import { ValidateCheckInUseCase } from "./validate-check-in";
import exp from "constants";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let checkInsRepository: InMemoryCheckInRepository;
let sut: ValidateCheckInUseCase;

describe("Validade Check In use case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInRepository();
    sut = new ValidateCheckInUseCase(checkInsRepository);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to validate check in", async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date));
  });

  it("should not be able to validate an inexistent check in", async () => {
    await expect(
      sut.execute({
        checkInId: "Inexistent-checkin-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
