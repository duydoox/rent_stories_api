import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { RentalCard } from './rentalCard.entity';
import { BookState } from './bookState.entity';
import { Bill } from './bill.entity';

@Entity()
export class BookPay {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ nullable: true })
  moneyPunish: number;

  @Column()
  description: string;

  @Column()
  money: number;

  @ManyToOne(() => RentalCard)
  rentalCard: RentalCard;

  @ManyToOne(() => BookState)
  bookState: BookState;

  @ManyToOne(() => Bill, (bill) => bill.bookPays)
  bill: Bill;
}
