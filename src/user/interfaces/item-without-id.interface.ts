import { User } from '../entities/user.entity';

export interface ItemWithoutId {
  name: string;
  user: User;
}
