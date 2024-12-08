import { beforeEach, describe, expect, it } from "vitest";
import { CreateGymUseCase } from "./create-gym";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";

let gymsRepository: InMemoryGymRepository;
let sut: CreateGymUseCase;

describe("Create gym use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it("should be able to create a gym", async () => {
    const { gym } = await sut.execute({
      title: "Typescript gym",
      description: "a strong typed gym",
      phone: "17284389",
      latitude: -15.5663265,
      longitude: -56.0908148,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
