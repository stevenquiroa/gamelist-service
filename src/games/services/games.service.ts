import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { Game } from '../entities/game.entity';
import { CreateGameDTO, FilterGamesDTO, UpdateGameDTO } from '../dtos/game.dto';

@Injectable()
export class GamesService {
  constructor(@InjectModel(Game.name) private gameModel: Model<Game>) {}

  findAll(fields: FilterGamesDTO) {
    const filters: FilterQuery<Game> = {};
    const { limit = 30, offset = 0, publisher, s } = fields;

    if (publisher) {
      filters.publisher = publisher;
    }

    if (s) {
      filters.title = s;
    }

    return this.gameModel.find(filters).populate('publisher').skip(offset).limit(limit).exec();
  }

  async findOne(id: string) {
    const game = await this.gameModel.findOne({ _id: id }).exec();
    if (!game) {
      throw new NotFoundException(`Game #${id} not found`);
    }
    return game;
  }

  create(data: CreateGameDTO) {
    const newGame = new this.gameModel(data);
    return newGame.save();
  }

  update(id: string, changes: UpdateGameDTO) {
    const game = this.gameModel.findByIdAndUpdate(
      id,
      { $set: changes },
      { new: true },
    );
    if (!game) {
      throw new NotFoundException(`Game #${id} not found`);
    }

    return game;
  }

  remove(id: string) {
    return this.gameModel.findByIdAndDelete(id);
  }
}
