import { GymsRepository } from "@/repositories/gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchGymsUseCase } from "./search-gyms";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let gymsRepository: GymsRepository;
let sut: SearchGymsUseCase;

describe("Search Gyms Use Cases", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "JavaScript Gym",
      description: "a strong typed gym",
      phone: "17284389",
      latitude: -15.5663265,
      longitude: -56.0908148,
    });

    await gymsRepository.create({
      title: "TypeScript Gym",
      description: "a strong typed gym",
      phone: "17284389",
      latitude: -15.5663265,
      longitude: -56.0908148,
    });

    const { gyms } = await sut.execute({
      query: "JavaScript",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "JavaScript Gym" }),
    ]);
  });

  it("should be able to fetch paginated gym search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym - ${i}`,
        description: "a strong typed gym",
        phone: "17284389",
        latitude: -15.5663265,
        longitude: -56.0908148,
      });
    }

    const { gyms } = await sut.execute({ query: "JavaScript", page: 2 });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "JavaScript Gym - 21" }),
      expect.objectContaining({ title: "JavaScript Gym - 22" }),
    ]);
  });
});
