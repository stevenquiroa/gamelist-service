import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConfigType } from '@nestjs/config';

import config from '../../config';
import { CreatePublisherDTO } from '../dtos/publisher.dto';
import { PublishersService } from '../services/publishers.service';

@ApiTags('publisher')
@Controller('publishers')
export class PublishersController {
  constructor(private publishersService: PublishersService) {}

  @ApiOperation({ summary: 'List of publishers' })
  @Get('/')
  list() {
    return this.publishersService.findAll();
  }
  //
  @ApiOperation({ summary: 'Create a publisher' })
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreatePublisherDTO) {
    return this.publishersService.create(payload);
  }
}
