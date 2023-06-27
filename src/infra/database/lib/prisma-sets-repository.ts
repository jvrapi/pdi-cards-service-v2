import { Injectable } from '@nestjs/common';
import { SetsRepository } from '../repositories/sets-repository';
import { Set } from '~/app/entities/set';
import { PrismaService } from '../services/prisma.service';
import { PrismaSetsMapper } from '../mappers/prisma-sets-mapper';

@Injectable()
export class PrismaSetsRepository implements SetsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllSets(): Promise<Set[]> {
    const sets = await this.prisma.set.findMany();
    return sets.map(PrismaSetsMapper.toDomain);
  }

  async getById(id: string): Promise<Set> {
    const set = await this.prisma.set.findUnique({ where: { id } });

    if (!set) {
      return null;
    }

    return PrismaSetsMapper.toDomain(set);
  }

  async create(set: Set): Promise<void> {
    await this.prisma.set.create({
      data: PrismaSetsMapper.toPrisma(set),
    });
  }
}
