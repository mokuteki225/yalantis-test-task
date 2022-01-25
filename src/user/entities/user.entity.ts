import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Item } from './item.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @OneToMany(() => Item, (item: Item) => item.user)
  wishlist: Array<Item>;

  @OneToOne(() => User)
  @JoinColumn()
  recipient: User;
}
