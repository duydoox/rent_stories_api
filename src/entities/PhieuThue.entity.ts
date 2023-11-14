import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { KhachHang } from './KhachHang.entity';
import { NhanVien } from './NhanVien.entity';

@Entity()
export class PhieuThue {
  @PrimaryGeneratedColumn()
  maPhieuThue: string;

  @Column({ nullable: true })
  ghiChu: Date;

  @ManyToMany(() => KhachHang)
  khachHang: KhachHang;

  @ManyToMany(() => NhanVien)
  nhanVien: NhanVien;
}
