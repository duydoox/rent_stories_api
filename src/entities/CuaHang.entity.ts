import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { NhanVien } from './NhanVien.entity';
import { Truyen } from './Truyen.entity';

@Entity()
export class CuaHang {
  @PrimaryGeneratedColumn()
  maCuaHang: string;

  @Column({ length: 500 })
  tenCuaHang: string;

  @Column('text')
  diaChi: string;

  @Column('text')
  moTa: string;

  @OneToMany(() => NhanVien, (nhanVien) => nhanVien.cuaHang)
  nhanViens: NhanVien[];

  @OneToMany(() => Truyen, (truyen) => truyen.cuaHang)
  truyens: Truyen[];
}
