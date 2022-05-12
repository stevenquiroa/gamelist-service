import * as dayjs from 'dayjs';
import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { FilterQuery, Model } from 'mongoose';

import { Game } from '../entities/game.entity';
import { CreateGameDTO, FilterGamesDTO, UpdateGameDTO } from '../dtos/game.dto';
import { response } from 'express';

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
      filters.title = { $regex: s, $options: 'i' };
    }

    return this.gameModel
      .find(filters)
      .populate('publisher')
      .skip(offset)
      .limit(limit)
      .exec();
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

  @Cron('0 0 2 * * *')
  async offer20() {
    const offerTag = 'offer20';
    const from = dayjs().subtract(18, 'months').format();
    const to = dayjs().subtract(12, 'months').format();
    const games = await this.gameModel
      .find({
        releaseDate: { $gte: from, $lte: to },
        tags: { $nin: [offerTag] },
      })
      .exec();

    let response = [];
    if (games.length > 0) {
      response = await Promise.all(
        games.map((game) => {
          const newPrice = game.price * (1 - 0.2);
          game.price = Math.round(newPrice * 100) / 100;
          game.tags.addToSet(offerTag);
          return game.save();
        }),
      );
    }

    return response;
  }

  @Cron('0 0 1 * * *')
  async removeOlder() {
    const from = dayjs().subtract(18, 'months').format();
    const response = await this.gameModel.deleteMany({
      releaseDate: { $lte: from },
    });

    return response;
  }
}
