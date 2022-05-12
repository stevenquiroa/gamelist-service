import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Publisher } from '../entities/publisher.entity';
import { CreatePublisherDTO } from '../dtos/publisher.dto';

@Injectable()
export class PublishersService {
  constructor(
    @InjectModel(Publisher.name) private publisherModel: Model<Publisher>,
  ) {}

  findAll() {
    return this.publisherModel.find().exec();
  }

  create(data: CreatePublisherDTO) {
    const newPublisher = new this.publisherModel(data);
    return newPublisher.save();
  }
}
