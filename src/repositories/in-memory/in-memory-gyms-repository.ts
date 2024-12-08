import { Gym, Prisma } from "@prisma/client";
import { GymsRepository } from "../gyms-repository";
import { randomUUID } from "crypto";
import { Decimal } from "@prisma/client/runtime/library";

export class InMemoryGymRepository implements GymsRepository {
  public items: Gym[] = [];
  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === id);

    if (!gym) return null;

    return gym;
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym | null> {
    const gym = {
      id: randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
    };

    this.items.push(gym);

    return gym;
  }
}