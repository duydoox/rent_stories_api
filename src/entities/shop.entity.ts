import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { ComicBook } from './comicBook.entity';

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  description: string;

  @Column()
  quantity: string;

  @OneToMany(() => User, (user) => user.shop)
  users: User[];

  @OneToMany(() => ComicBook, (comicBook) => comicBook.shop)
  comicBooks: ComicBook[];
}
