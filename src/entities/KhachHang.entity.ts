import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class KhachHang {
  @PrimaryGeneratedColumn()
  maKhachHang: string;

  @Column()
  tenKhachHang: string;

  @Column()
  soDienThoai: string;

  constructor(partial?: Partial<KhachHang>) {
    Object.assign(this, partial);
  }
}
