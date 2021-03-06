import { Module } from '@nestjs/common';

import { UserModule } from 'src/user/user.module';

import { GameController } from './game.controller';

import { GameService } from './game.service';

@Module({
  imports: [UserModule],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
