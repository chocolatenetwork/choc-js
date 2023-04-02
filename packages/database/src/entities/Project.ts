import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Review } from './Review';
import { User } from './User';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  projectId!: number;

  @Column({
    default: 0,
    type: 'integer',
  })
  ratingSum!: number;

  @Column({
    default: 0,
    type: 'integer',
  })
  reviewCount!: number;

  @OneToOne(() => User, { nullable: false })
  @JoinColumn()
  owner!: User;

  @OneToMany(() => Review, (review) => review.project, { nullable: true })
  reviews!: Review[];

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

  name!: string;
  logo!: string;
}
