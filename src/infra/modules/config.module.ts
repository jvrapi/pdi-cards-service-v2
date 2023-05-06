import { Module } from '@nestjs/common';
import { ConfigModule as ConfigModuleNestJs } from '@nestjs/config';
@Module({
  imports: [
    ConfigModuleNestJs.forRoot({
      isGlobal: true,
    }),
  ],
})
export class ConfigModule {}
