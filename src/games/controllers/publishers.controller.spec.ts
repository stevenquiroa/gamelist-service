import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { PublishersController } from './publishers.controller';
import { PublishersService } from '../services/publishers.service';
import { Publisher } from '../entities/publisher.entity';

describe('PublishersController', () => {
  let controller: PublishersController;
  let service: PublishersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublishersController],
      providers: [
        PublishersService,
        { provide: getModelToken(Publisher.name), useValue: jest.fn() },
      ],
    }).compile();
    controller = module.get<PublishersController>(PublishersController);
    service = module.get<PublishersService>(PublishersService);

    controller = module.get<PublishersController>(PublishersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
