import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { ConfigModule } from '@nestjs/config';

import config from './config';

@Module({
  imports: [
    GamesModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
