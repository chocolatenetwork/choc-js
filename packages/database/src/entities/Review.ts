import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  review_id!: number;

  @Column({
    default: 0,
    type: 'integer',
  })
  rating!: number;
}
