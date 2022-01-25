import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { Item } from './entities/item.entity';

import { ItemWithoutId } from './interfaces/item-without-id.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
  ) {}

  async findAllUsersRand() {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.recipient', 'recipient')
      .orderBy('RANDOM()')
      .limit(500)
      .getMany();

    return users;
  }

  async getRecipient(id: string) {
    const user = await this.userRepository.findOne(id, {
      relations: ['recipient', 'recipient.wishlist'],
    });

    if (!user) {
      throw new NotFoundException(`There is no user under this id`);
    }

    if (!user.recipient) {
      throw new ForbiddenException(`The game hasn't started yet`);
    }

    return user.recipient;
  }

  async saveUsers(users: Array<User>) {
    return this.userRepository.save(users);
  }

  async createUser(name: string, surname: string) {
    const amountOfUsers = await this.userRepository.count();

    if (amountOfUsers >= 500) {
      throw new ForbiddenException(`No slots left to play`);
    }

    const user = await this.userRepository.create({
      name,
      surname,
    });

    return this.userRepository.save(user);
  }

  async createUserItems(wishlist: Array<ItemWithoutId>) {
    const items = await this.itemRepository.create(wishlist);

    return this.itemRepository.save(items);
  }
}
