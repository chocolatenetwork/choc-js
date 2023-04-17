import { AccountType } from '@choc-js/schema';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from './Project';
import { User } from './User';

@Entity()
export class UserVerification {
  @PrimaryGeneratedColumn()
  id!: string;
  @Column({
    type: 'varchar',
    unique: true,
  })
  address!: string;
  @Column({
    type: 'varchar',
  })
  datahash!: string;
  @Column({
    type: 'varchar',
  })
  signature!: string;

  // user info

  @Column({
    type: 'enum',
    enum: AccountType,
  })
  accountType!: AccountType;
  @Column({
    type: 'varchar',
    nullable: true,
  })
  picture!: string | null;
  @Column({
    type: 'text',
    nullable: true,
  })
  description!: string | null;
  @Column({
    type: 'varchar',
  })
  name!: string;
  @Column({
    type: 'varchar',
  })
  twitter!: string;

  @OneToOne(() => User, (user) => user.userVerification, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user!: User | null;
  @OneToOne(() => Project, (project) => project.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  project!: Project | null;
  // timestamps
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
}
