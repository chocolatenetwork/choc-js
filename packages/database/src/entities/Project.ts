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
import { UserVerification } from './UserVerification';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id!: number;

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

  @Column({
    type: 'varchar',
  })
  name!: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  logo!: string | null;

  @Column({
    type: 'text',
    nullable: true,
  })
  description!: string | null;

  @OneToOne(() => UserVerification, { nullable: true })
  userVerification!: UserVerification | null;
}
