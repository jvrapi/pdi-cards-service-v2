import { Module } from '@nestjs/common';
import { PrismaService } from '../database/services/prisma.service';
import { CardsRepository } from '../../app/repositories/cards.repository';
import { PrismaCardsRepository } from '../database/lib/prisma-cards-repository';
import { SetsRepository } from '../../app/repositories/sets-repository';
import { PrismaSetsRepository } from '../database/lib/prisma-sets-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: CardsRepository,
      useClass: PrismaCardsRepository,
    },
    {
      provide: SetsRepository,
      useClass: PrismaSetsRepository,
    },
  ],
  exports: [CardsRepository, SetsRepository],
})
export class DatabaseModule {}
