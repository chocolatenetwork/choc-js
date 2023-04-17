import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from './Project';
import { User } from './User';

@Entity()
@Unique('user_can_only_review_once', ['user', 'project'])
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

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

  @Column({
    type: 'varchar',
  })
  datahash!: string;
  @Column({
    type: 'varchar',
  })
  signature!: string;
}
