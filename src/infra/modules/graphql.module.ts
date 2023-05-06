import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule as GraphQLModuleNestJS } from '@nestjs/graphql';
import { CardResolver } from '~/app/graphql/resolvers/card.resolver';
import { GetCardsService } from '~/app/graphql/services/get-cards.service';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
    GraphQLModuleNestJS.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    DatabaseModule,
  ],
  providers: [CardResolver, GetCardsService],
})
export class GraphQLModule {}
