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

import { ConfigType } from '@nestjs/config';

import config from '../../config';
import { CreateGameDTO, UpdateGameDTO } from '../dtos/game.dto';
import { GamesService } from '../services/games.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('games')
@Controller('games')
export class GamesController {
  constructor(
    private gamesService: GamesService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  @ApiOperation({ summary: 'List of games' })
  @Get('/')
  list(
    @Query('limit') limit = 30,
    @Query('offset') offset = 0,
    @Query('publisher') publisher: string,
    @Query('s') s: string,
  ) {
    return this.gamesService.findAll();
  }
  //
  // @ApiOperation({ summary: 'Create a game' })
  // @Post('/')
  // @HttpCode(HttpStatus.CREATED)
  // create(@Body() payload: CreateGameDTO) {
  //   // return this.gamesService.create(payload);
  // }
  //
  @ApiOperation({ summary: 'Get a game' })
  @Get('/:id')
  get(@Param('id') id: string) {
    // return this.gamesService.create(payload);
    return this.gamesService.findOne(id);
  }
  //
  // @ApiOperation({ summary: 'Update a game' })
  // @Put('/:id')
  // update(@Param('id') id: string, @Body() payload: UpdateGameDTO) {
  //   return { ...payload, id };
  // }
  //
  // @ApiOperation({ summary: 'Delete a game' })
  // @Delete('/:id')
  // delete(@Param('id') id: string) {
  //   return this.gamesService.remove(id);
  // }
}
