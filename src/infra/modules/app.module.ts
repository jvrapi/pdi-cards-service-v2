import { Module } from '@nestjs/common';
import { GraphQLModule } from '../modules/graphql.module';
import { ConfigModule } from '../modules/config.module';
import { MessagingModule } from './messaging.module';

@Module({
  imports: [ConfigModule, GraphQLModule, MessagingModule],
})
export class AppModule {}
