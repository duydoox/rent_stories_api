import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CuaHang } from './CuaHang.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class NhanVien {
  @PrimaryGeneratedColumn()
  maNhanVien: string;

  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  viTri: string;

  @Column({ nullable: true })
  tenNhanVien: string;

  @Column({ nullable: true })
  soDienThoai: string;

  @Column({ nullable: true })
  diaChi: string;

  @Column({ nullable: true })
  ngaySinh: Date;

  @Column({ nullable: true })
  gioiTinh: string;

  @ManyToOne(() => CuaHang, (cuaHang) => cuaHang.nhanViens)
  cuaHang: CuaHang;

  constructor(partial?: Partial<NhanVien>) {
    Object.assign(this, partial);
  }
}
