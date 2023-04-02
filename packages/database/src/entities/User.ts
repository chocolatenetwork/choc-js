import { AccountType } from '@choc-js/schema';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(0)',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(0)',
  })
  updatedAt!: Date;
}
