import { Module } from '@nestjs/common';
import { GamesController } from './controllers/games.controller';
import { GamesService } from "./services/games.service";

@Module({
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
