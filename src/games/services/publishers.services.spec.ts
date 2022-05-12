import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { PublishersService } from './publishers.service';
import { Publisher } from '../entities/publisher.entity';

describe('PublishersService', () => {
  let provider: PublishersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PublishersService,
        { provide: getModelToken(Publisher.name), useValue: jest.fn() },
      ],
    }).compile();

    provider = module.get<PublishersService>(PublishersService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
