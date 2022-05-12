import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { GamesService } from './games.service';
import { Game } from '../entities/game.entity';

describe('GamesService', () => {
  let provider: GamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GamesService,
        { provide: getModelToken(Game.name), useValue: jest.fn() },
      ],
    }).compile();
    provider = module.get<GamesService>(GamesService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
