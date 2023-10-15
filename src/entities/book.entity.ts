import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ComicBook } from './comicBook.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  nameOfBook: string;

  @Column({ nullable: true })
  publishingYear: number;

  @Column({ nullable: true })
  publishingCompany: string;

  @Column()
  author: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  chapter: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => ComicBook, (comicBook) => comicBook.books)
  comicBook: ComicBook;
}
