import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { BookPay } from './bookPay.entity';

@Entity()
export class Bill {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ default: new Date() })
  payDate: Date;

  @Column()
  sumOfMoney: number;

  @Column({ nullable: true })
  quantity: number;

  @OneToMany(() => BookPay, (bookPay) => bookPay.bill)
  bookPays: BookPay[];

  @ManyToOne(() => User)
  user: User;
}
