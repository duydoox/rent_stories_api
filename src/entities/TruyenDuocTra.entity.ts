import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { HoaDon } from './HoaDon.entity';
import { TruyenDuocThue } from '.';
import { IsDate } from 'class-validator';

@Entity()
export class TruyenDuocTra {
  @PrimaryGeneratedColumn()
  maTruyenDuocTra: string;

  @Column('float', { nullable: true })
  tienPhat: number;

  @Column('float')
  tienDaTra: number;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  @IsDate()
  ngayTra: Date;

  @Column({ nullable: true })
  lyDoPhat: string;

  @OneToOne(
    () => TruyenDuocThue,
    (truyenDuocThue) => truyenDuocThue.truyenDuocTra,
    { cascade: true },
  )
  @JoinColumn()
  truyenDuocThue: TruyenDuocThue;

  @ManyToOne(() => HoaDon, (hoaDon) => hoaDon.truyenDuocTras)
  hoaDon: HoaDon;

  tinhTien() {
    const ngayTraDuKien = new Date(this.truyenDuocThue.ngayPhaiTra);
    const ngayTra = new Date(this.ngayTra);
    if (!isNaN(ngayTraDuKien.getTime()) && !isNaN(ngayTra.getTime())) {
      const tongTien =
        (this.truyenDuocThue.giaThue ?? 0) *
        ((+ngayTra - +ngayTraDuKien) / 24 / 3600000);
      this.tienPhat = Math.max(+tongTien.toFixed(), 0);
    }

    this.tienDaTra = this.truyenDuocThue.tongTien + this.tienPhat;
  }
}
