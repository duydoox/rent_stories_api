import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
