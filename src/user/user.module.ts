import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { Item } from './entities/item.entity';

import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Item])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
