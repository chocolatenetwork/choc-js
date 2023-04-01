import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('integer')
  owner_id!: number;
}
