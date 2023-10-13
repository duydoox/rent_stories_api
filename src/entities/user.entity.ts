import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
