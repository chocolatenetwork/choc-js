import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from './Project';
import { User } from './User';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  reviewId!: number;

  @Column({
    default: 0,
    type: 'integer',
  })
  rating!: number;

  @ManyToOne(() => User, (user) => user.reviews, { nullable: false })
  @JoinColumn()
  user!: User;

  @ManyToOne(() => Project, (project) => project.reviews, { nullable: false })
  @JoinColumn()
  project!: Project;
}
