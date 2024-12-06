import { describe } from "node:test";
import { beforeEach, expect, it } from "vitest";
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./checkin";

let checkInsRepository: InMemoryCheckInRepository;
let sut: CheckInUseCase;

describe("Check In use case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInRepository();
    sut = new CheckInUseCase(checkInsRepository);
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-0",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
