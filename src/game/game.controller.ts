import { Controller, Post, Body, Get, Param } from '@nestjs/common';

import { GameService } from './game.service';

import { JoinGameDto } from './dto/join-game.dto';

@Controller()
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get(':id')
  async getRecipient(@Param('id') id: string) {
    return this.gameService.getRecipient(id);
  }

  @Post('join')
  async joinGame(@Body() dto: JoinGameDto) {
    return this.gameService.joinGame(dto);
  }

  @Post('shuffle')
  async shuffle() {
    return this.gameService.shuffle();
  }
}
