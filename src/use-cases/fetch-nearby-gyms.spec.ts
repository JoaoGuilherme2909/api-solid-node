import { GymsRepository } from "@/repositories/gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchGymsUseCase } from "./search-gyms";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: GymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch Nearby Gyms Use Cases", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "near Gym",
      description: "a strong typed gym",
      phone: "17284389",
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    await gymsRepository.create({
      title: "far Gym",
      description: "a strong typed gym",
      phone: "17284389",
      latitude: -27.1390403,
      longitude: -49.5329254,
    });

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "near Gym" })]);
  });
});
