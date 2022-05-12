import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GamesController } from './controllers/games.controller';
import { GamesService } from './services/games.service';
import { Game, GameSchema } from './entities/game.entity';

import { PublishersController } from './controllers/publishers.controller';
import { PublishersService } from './services/publishers.service';
import { Publisher, PublisherSchema } from './entities/publisher.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Game.name,
        schema: GameSchema,
      },
      {
        name: Publisher.name,
        schema: PublisherSchema,
      },
    ]),
  ],
  controllers: [GamesController, PublishersController],
  providers: [GamesService, PublishersService],
})
export class GamesModule {}
