import { AccountType } from '@choc-js/schema';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  account_id!: number;

  @Column({
    type: 'enum',
    enum: AccountType,
  })
  account_type!: AccountType;

  @Column({
    default: 0,
    type: 'integer',
  })
  points!: number;
}
