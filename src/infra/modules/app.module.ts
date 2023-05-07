import { Module } from '@nestjs/common';
import { GraphQLModule } from '../modules/graphql.module';
import { ConfigModule } from '../modules/config.module';
import { MessagingModule } from './messaging.module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [ConfigModule, DatabaseModule, GraphQLModule, MessagingModule],
})
export class AppModule {}
