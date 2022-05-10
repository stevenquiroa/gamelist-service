import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';

@Module({
  imports: [GamesModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
