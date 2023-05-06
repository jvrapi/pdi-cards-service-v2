import { Module } from '@nestjs/common';
import { GraphQLModule } from '../modules/graphql.module';
import { ConfigModule } from '../modules/config.module';

@Module({
  imports: [ConfigModule, GraphQLModule],
})
export class AppModule {}
