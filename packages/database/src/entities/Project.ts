import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
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
}
