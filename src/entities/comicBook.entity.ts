import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Book } from './book.entity';
import { Shop } from './shop.entity';

@Entity()
export class ComicBook {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Book, (book) => book.comicBook)
  books: Book[];

  @ManyToOne(() => Shop, (shop) => shop.comicBooks)
  shop: Shop;
}
