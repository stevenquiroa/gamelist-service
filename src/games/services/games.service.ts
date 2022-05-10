import { Injectable, NotFoundException } from '@nestjs/common';

import { Game } from '../entities/game.entity';
import { CreateGameDTO, UpdateGameDTO } from '../dtos/game.dto';

@Injectable()
export class GamesService {
  private counterId = '1';
  private games: Game[] = [
    {
      id: '4507f1f77bcf86cd799439011',
      title: 'Gameo 1',
      price: 10.0,
      tags: ['new_release', 'adventure'],
      releaseDate: '2022-05-09T21:00:30Z',
    },
  ];

  findAll() {
    return this.games;
  }

  findOne(id: string) {
    const game = this.games.find((item) => item.id === id);
    if (!game) {
      throw new NotFoundException(`Game #${id} not found`);
    }
    return game;
  }

  create(data: CreateGameDTO) {
    this.counterId = `${this.counterId}1`;
    const newGame = {
      id: this.counterId,
      ...data,
    };
    this.games.push(newGame);
    return newGame;
  }

  update(id: string, changes: UpdateGameDTO) {
    const game = this.findOne(id);
    const index = this.games.findIndex((item) => item.id === id);
    this.games[index] = {
      ...game,
      ...changes,
    };
    return this.games[index];
  }

  remove(id: string) {
    const index = this.games.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Game #${id} not found`);
    }
    this.games.splice(index, 1);
    return id;
  }
}
