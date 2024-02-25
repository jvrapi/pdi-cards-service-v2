import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule as GraphQLModuleNestJS } from '@nestjs/graphql';
import { ApolloServerPlugin } from '@apollo/server';
import createNewRelicPlugin from '@newrelic/apollo-server-plugin';

const newRelicPlugin = createNewRelicPlugin<ApolloServerPlugin>({});
@Module({
  imports: [
    GraphQLModuleNestJS.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      plugins: [newRelicPlugin],
    }),
  ],
})
export class GraphQLModule {}
