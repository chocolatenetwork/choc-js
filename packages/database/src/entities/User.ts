import { AccountType, UserRole } from '@choc-js/schema';
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
import { UserVerification } from './UserVerification';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'enum',
    enum: AccountType,
  })
  accountType!: AccountType;

  @Column({
    default: 1,
    type: 'integer',
  })
  points!: number;

  @OneToOne(() => Project, { nullable: true })
  project!: Project | null;

  @OneToMany(() => Review, (review) => review.user, {
    nullable: true,
  })
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

  @Column({
    type: 'varchar',
    nullable: true,
  })
  picture!: string | null;
  @Column({
    type: 'varchar',
    unique: true,
  })
  address!: string;

  @OneToOne(() => UserVerification, { nullable: true })
  userVerification!: UserVerification | null;

  @Column({
    type: 'enum',
    default: UserRole.normal,
    enum: UserRole,
  })
  userRole!: UserRole;

  @Column({
    type: 'varchar',
  })
  name!: string;
}
