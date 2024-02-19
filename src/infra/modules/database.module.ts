import { Module } from '@nestjs/common';
import { CardsRepository } from '~/app/repositories/cards.repository';
import { SetsRepository } from '~/app/repositories/sets-repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '../database/typeorm/config/database-config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Card } from '../database/typeorm/entities/card.entity';
import { Set } from '../database/typeorm/entities/set.entity';
import { TypeOrmCardsRepository } from '../database/typeorm/repositories/typeorm-cards.repository';
import { TypeOrmSetsRepository } from '../database/typeorm/repositories/typeorm-sets.repository';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([Card, Set]),
  ],
  providers: [
    {
      provide: CardsRepository,
      useClass: TypeOrmCardsRepository,
    },
    {
      provide: SetsRepository,
      useClass: TypeOrmSetsRepository,
    },
  ],
  exports: [CardsRepository, SetsRepository],
})
export class DatabaseModule {}
