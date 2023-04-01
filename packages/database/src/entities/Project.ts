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
  project_id!: number;

  @Column({
    default: 0,
    type: 'integer',
  })
  rating_sum!: number;

  @Column({
    default: 0,
    type: 'integer',
  })
  review_count!: number;

  @OneToOne(() => User)
  @JoinColumn()
  owner!: User;

  @OneToMany(() => Review, (review) => review.project)
  reviews!: Review[] | null;
}
