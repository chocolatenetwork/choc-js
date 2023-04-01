import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from './Project';
import { User } from './User';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  review_id!: number;

  @Column({
    default: 0,
    type: 'integer',
  })
  rating!: number;

  @ManyToOne(() => User, (user) => user.reviews)
  user!: User;
  @ManyToOne(()=>Project, (project)=>project.reviews)
  project!: Project;
}
