import { beforeEach, expect, it, vi, describe, afterEach } from "vitest";
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./checkin";
import { string } from "zod";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";

let checkInsRepository: InMemoryCheckInRepository;
let gymsRepository: InMemoryGymRepository;
let sut: CheckInUseCase;

describe("Check In use case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInRepository();
    gymsRepository = new InMemoryGymRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);
    gymsRepository.items.push({
      id: "gym-01",
      title: "JavaScript Gym",
      description: "",
      phone: "",
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    });
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-0",
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    await sut.execute({
      gymId: "gym-01",
      userId: "user-0",
      userLatitude: 0,
      userLongitude: 0,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-0",
        userLatitude: 0,
        userLongitude: 0,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check in twice but in different days", async () => {
    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 0,
      userLongitude: 0,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkIn.id).toBeTruthy();
  });

  it("should not be able to check in on distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-02",
      title: "JavaScript Gym",
      description: "",
      phone: "",
      latitude: new Decimal(-15.6070879),
      longitude: new Decimal(-55.912474),
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-02",
        userId: "user-0",
        userLatitude: -15.6773307,
        userLongitude: -56.1617055,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
