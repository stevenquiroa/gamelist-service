import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { GamesController } from './games.controller';
import { GamesService } from '../services/games.service';
import { Game } from '../entities/game.entity';
import { NotFoundException } from '@nestjs/common';

const fakeGames = [
  {
    _id: '627d45708a18ea02aaba54f1',
    title: 'The Legend of Zelda: Breath of the Wild',
    price: 60,
    tags: ['adventure', 'open-world'],
    releaseDate: '2018-05-09T20:08:36.000Z',
    publisher: {
      id: '627c5034d92696420e206ed1',
      title: 'Nintendo',
    },
  },
];

describe('GamesController', () => {
  let controller: GamesController;
  let service: GamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamesController],
      providers: [
        GamesService,
        { provide: getModelToken(Game.name), useValue: jest.fn() },
      ],
    }).compile();
    controller = module.get<GamesController>(GamesController);
    service = module.get<GamesService>(GamesService);
  });

  it('list: return an array of games', async () => {
    const spyFindAll = jest.spyOn(service, 'findAll');
    spyFindAll.mockResolvedValue(fakeGames as any);

    const response = await controller.list({});

    expect(response.length).toEqual(1);
    expect(spyFindAll).toBeCalled();
    expect(spyFindAll).toBeCalledWith({});
  });

  it('create: return created game', async () => {
    const spyCreate = jest.spyOn(service, 'create');
    spyCreate.mockResolvedValue(fakeGames[0] as any);

    const response = await controller.create({
      title: fakeGames[0].title,
      price: fakeGames[0].price,
      tags: fakeGames[0].tags,
      releaseDate: fakeGames[0].releaseDate,
      publisher: fakeGames[0].publisher.id,
    });

    expect(response.title).toEqual(fakeGames[0].title);
    expect(spyCreate).toBeCalled();
  });

  it('get: return one game', async () => {
    const spyFindOne = jest.spyOn(service, 'findOne');
    spyFindOne.mockResolvedValue(fakeGames[0] as any);

    const response = await controller.get(fakeGames[0]._id);

    expect(response.title).toEqual(fakeGames[0].title);
    expect(spyFindOne).toBeCalled();
    expect(spyFindOne).toBeCalledWith(fakeGames[0]._id);
  });

  it('get: return no games', async () => {
    const spyFindOne = jest.spyOn(service, 'findOne');
    spyFindOne.mockRejectedValue(
      new NotFoundException(`Game #122 not found`),
    );

    expect(controller.get(fakeGames[0]._id)).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(spyFindOne).toBeCalled();
    expect(spyFindOne).toBeCalledWith(fakeGames[0]._id);
  });
});
