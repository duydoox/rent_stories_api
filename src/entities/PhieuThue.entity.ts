import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { KhachHang } from './KhachHang.entity';
import { NhanVien } from './NhanVien.entity';
import { TruyenDuocThue } from './TruyenDuocThue.entity';

@Entity()
export class PhieuThue {
  @PrimaryGeneratedColumn()
  maPhieuThue: string;

  @Column({ nullable: true })
  ghiChu: string;

  @ManyToOne(() => KhachHang)
  khachHang: KhachHang;

  @ManyToOne(() => NhanVien)
  nhanVien: NhanVien;

  @OneToMany(
    () => TruyenDuocThue,
    (truyenDuocThue) => truyenDuocThue.phieuThue,
    { cascade: true },
  )
  truyenDuocThue: TruyenDuocThue[];
}
