import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class KhachHang {
  @PrimaryGeneratedColumn()
  maKhachHang: string;

  @Column()
  tenKhachHang: string;

  @Column()
  soDienThoai: string;
}
