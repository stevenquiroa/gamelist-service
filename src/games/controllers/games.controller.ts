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
} from '@nestjs/common';
import { CreateGameDTO, UpdateGameDTO } from '../dtos/game.dto';
import { GamesService } from '../services/games.service';

@Controller('games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Get('/')
  list(
    @Query('limit') limit = 30,
    @Query('offset') offset = 0,
    @Query('publisher') publisher: string,
    @Query('s') s: string,
  ) {
    return [];
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateGameDTO) {
    // return this.gamesService.create(payload);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() payload: UpdateGameDTO) {
    return { ...payload, id };
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.gamesService.remove(id);
  }
}
