import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Truyen } from './Truyen.entity';
import { PhieuThue } from './PhieuThue.entity';
import { TruyenDuocTra } from './TruyenDuocTra.entity';
import { IsDate } from 'class-validator';

@Entity()
export class TruyenDuocThue {
  @PrimaryGeneratedColumn()
  maTruyenDuocThue: string;

  @Column('float')
  giaThue: number;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  @IsDate()
  ngayThue: Date;

  @Column('datetime', { nullable: true })
  @IsDate()
  ngayPhaiTra: Date;

  @Column('float')
  tongTien: number;

  @ManyToOne(() => Truyen, { cascade: true })
  truyen: Truyen;

  @ManyToOne(() => PhieuThue, (phieuThue) => phieuThue.truyenDuocThue)
  phieuThue: PhieuThue;

  @OneToOne(
    () => TruyenDuocTra,
    (truyenDuocTra) => truyenDuocTra.truyenDuocThue,
  )
  truyenDuocTra: TruyenDuocTra;

  tinhTien() {
    const ngayThue = new Date(this.ngayThue);
    const ngayTra = new Date(this.ngayPhaiTra);
    if (!isNaN(ngayThue.getTime()) && !isNaN(ngayTra.getTime())) {
      const tongTien =
        (this.giaThue ?? 0) * ((+ngayTra - +ngayThue) / 24 / 3600000);
      this.tongTien = +tongTien.toFixed();
    }
  }
}
