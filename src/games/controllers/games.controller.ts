import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConfigType } from '@nestjs/config';

import config from '../../config';
import { CreateGameDTO, FilterGamesDTO, UpdateGameDTO } from '../dtos/game.dto';
import { GamesService } from '../services/games.service';
import { MongoIdPipe } from '../../common/mongo-id.pipe';

@ApiTags('games')
@Controller('games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @ApiOperation({ summary: 'List of games' })
  @Get('/')
  list(@Query() params: FilterGamesDTO) {
    return this.gamesService.findAll(params);
  }
  //
  @ApiOperation({ summary: 'Create a game' })
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateGameDTO) {
    return this.gamesService.create(payload);
  }
  //
  @ApiOperation({ summary: 'Get a game' })
  @Get('/:id')
  get(@Param('id', MongoIdPipe) id: string) {
    return this.gamesService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a game' })
  @Put('/:id')
  update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateGameDTO) {
    return this.gamesService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete a game' })
  @Delete('/:id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.gamesService.remove(id);
  }
}
