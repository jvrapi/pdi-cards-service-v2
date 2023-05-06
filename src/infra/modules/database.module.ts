import { Module } from '@nestjs/common';
import { PrismaService } from '../database/services/prisma.service';
import { CardsRepository } from '../database/repositories/cards.repository';
import { PrismaCardsRepository } from '../database/lib/prisma-cards-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: CardsRepository,
      useClass: PrismaCardsRepository,
    },
  ],
  exports: [CardsRepository],
})
export class DatabaseModule {}
