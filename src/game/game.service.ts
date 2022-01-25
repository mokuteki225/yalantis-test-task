import { ForbiddenException, Injectable } from '@nestjs/common';

import { ItemWithoutId } from '../user/interfaces/item-without-id.interface';
import { JoinGameDto } from './dto/join-game.dto';

import { User } from '../user/entities/user.entity';

import { UserService } from '../user/user.service';

@Injectable()
export class GameService {
  constructor(private readonly userService: UserService) {}

  async getRecipient(id: string) {
    return this.userService.getRecipient(id);
  }

  async joinGame(dto: JoinGameDto) {
    const { name, surname, wishlist } = dto;

    const user = await this.userService.createUser(name, surname);

    const items = this.mapItems(wishlist, user);

    await this.userService.createUserItems(items);

    return { id: user.id };
  }

  async shuffle() {
    const users = await this.userService.findAllUsersRand();

    const hasAlreadyShuffled = users[0].recipient;
    const hasEnoughPlayers = users.length >= 3;

    if (!hasEnoughPlayers) {
      throw new ForbiddenException(
        `You need at least 3 players to start the game`,
      );
    }

    if (hasAlreadyShuffled) {
      throw new ForbiddenException(`Users have already been shuffled`);
    }

    const usersWithRecipients = this.setRecipients(users);

    await this.userService.saveUsers(usersWithRecipients);

    return {
      message:
        'Users have been shuffled, now go for GET /:id to get your recipient!',
    };
  }

  private mapItems(items: Array<string>, user: User): Array<ItemWithoutId> {
    return items.map((name: string) => ({ name, user }));
  }

  private setRecipients(users: Array<User>) {
    for (let i = 0; i < users.length; i++) {
      if (i !== users.length - 1) {
        users[i].recipient = users[i + 1];
        continue;
      }

      users[i].recipient = users[0];
    }

    return users;
  }
}
