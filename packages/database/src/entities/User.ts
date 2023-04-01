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
  accountId!: number;

  @Column({
    type: 'enum',
    enum: AccountType,
  })
  accountType!: AccountType;

  @Column({
    default: 0,
    type: 'integer',
  })
  points!: number;

  @OneToOne(() => Project, { nullable: true })
  project!: Project | null;

  @OneToMany(() => Review, (review) => review.user, { nullable: true })
  reviews!: Review[] | null;
}
