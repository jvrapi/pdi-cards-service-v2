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
import { CardFace } from '../database/typeorm/entities/card-face.entity';
import { Color } from '../database/typeorm/entities/color.entity';
import { Version } from '../database/typeorm/entities/version.entity';
import { Rarity } from '../database/typeorm/entities/rarity.entity';
import { Format } from '../database/typeorm/entities/format.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([
      Card,
      Set,
      CardFace,
      Color,
      Version,
      Rarity,
      Format,
    ]),
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
