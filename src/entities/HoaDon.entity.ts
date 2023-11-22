import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { NhanVien } from './NhanVien.entity';
import { TruyenDuocTra } from './TruyenDuocTra.entity';

@Entity()
export class HoaDon {
  @PrimaryGeneratedColumn()
  maHoaDon: string;

  @Column('float')
  tongTien: number;

  @Column({ nullable: true })
  ghiChu: string;

  @ManyToOne(() => NhanVien)
  nhanVien: NhanVien;

  @OneToMany(() => TruyenDuocTra, (truyenDuocTra) => truyenDuocTra.hoaDon, {
    cascade: true,
  })
  truyenDuocTras: TruyenDuocTra[];

  constructor(partial?: Partial<HoaDon>) {
    Object.assign(this, partial);
  }

  tinhTien() {
    const tongTien = this.truyenDuocTras.reduce(
      (sum, item) => sum + item.tienDaTra,
      0,
    );
    this.tongTien = tongTien;
  }
}
