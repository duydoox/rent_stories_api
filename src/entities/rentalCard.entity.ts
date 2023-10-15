import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Customer } from './customer.entity';
import { User } from './user.entity';
import { BookState } from './bookState.entity';

@Entity()
export class RentalCard {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ default: new Date() })
  rentalDate: Date;

  @Column()
  quantity: number;

  @Column({ nullable: true })
  address: string;

  @OneToOne(() => Customer)
  @JoinColumn()
  customer: Customer;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => BookState, (bookState) => bookState.rentalCard)
  bookStates: BookState[];
}
