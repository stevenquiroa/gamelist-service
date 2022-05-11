import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Game } from '../entities/game.entity';
import { CreateGameDTO, UpdateGameDTO } from '../dtos/game.dto';

@Injectable()
export class GamesService {
  constructor(@InjectModel(Game.name) private gameModel: Model<Game>) {}

  findAll() {
    return this.gameModel.find().exec();
  }

  async findOne(id: string) {
    const game = await this.gameModel.findById(id).exec();
    if (!game) {
      throw new NotFoundException(`Game #${id} not found`);
    }
    return game;
  }

  // create(data: CreateGameDTO) {
  //   this.counterId = `${this.counterId}1`;
  //   const newGame = {
  //     id: this.counterId,
  //     ...data,
  //   };
  //   this.games.push(newGame);
  //   return newGame;
  // }
  //
  // update(id: string, changes: UpdateGameDTO) {
  //   const game = this.findOne(id);
  //   const index = this.games.findIndex((item) => item.id === id);
  //   this.games[index] = {
  //     ...game,
  //     ...changes,
  //   };
  //   return this.games[index];
  // }
  //
  // remove(id: string) {
  //   const index = this.games.findIndex((item) => item.id === id);
  //   if (index === -1) {
  //     throw new NotFoundException(`Game #${id} not found`);
  //   }
  //   this.games.splice(index, 1);
  //   return id;
  // }
}
