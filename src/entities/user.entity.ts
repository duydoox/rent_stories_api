import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Shop } from './shop.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ unique: true })
  userName: string;

  @Column()
  passWord: string;

  @Column()
  position: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  dayOfBirth: Date;

  @Column({ nullable: true })
  gender: string;

  @ManyToOne(() => Shop, (shop) => shop.users)
  shop: Shop;
}
