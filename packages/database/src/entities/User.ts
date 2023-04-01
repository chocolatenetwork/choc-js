import { AccountType } from '@choc-js/schema';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from './Project';
import { Review } from './Review';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  account_id!: number;

  @Column({
    type: 'enum',
    enum: AccountType,
  })
  account_type!: AccountType;

  @Column({
    default: 0,
    type: 'integer',
  })
  points!: number;

  @OneToOne(() => Project)
  project!: Project | null;

  @OneToMany(() => Review, (review) => review.user)
  reviews!: Review[] | null;
}
