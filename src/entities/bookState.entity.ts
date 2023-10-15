import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Book } from './book.entity';
import { RentalCard } from './rentalCard.entity';

@Entity()
export class BookState {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ nullable: true })
  state: string;

  @ManyToOne(() => Book)
  book: Book;

  @ManyToOne(() => RentalCard, (rentalCard) => rentalCard.bookStates)
  rentalCard: RentalCard;
}
