import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '~/infra/modules/database.module';
import { GraphQLModule } from './graphql.module';
import { CardResolver } from '../graphql/resolvers/card.resolver';
import { GetCardsService } from '../graphql/services/get-cards.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule,
    DatabaseModule,
  ],
  providers: [CardResolver, GetCardsService],
})
export class AppModule {}
