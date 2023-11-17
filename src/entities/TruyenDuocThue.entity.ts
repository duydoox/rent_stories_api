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

@Entity()
export class TruyenDuocThue {
  @PrimaryGeneratedColumn()
  maTruyenDuocThue: string;

  @Column('float')
  giaThue: number;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  ngayThue: Date;

  @Column('datetime', { nullable: true })
  ngayPhaiTra: Date;

  @ManyToOne(() => Truyen)
  truyen: Truyen;

  @ManyToOne(() => PhieuThue)
  phieuThue: PhieuThue;

  @OneToOne(
    () => TruyenDuocTra,
    (truyenDuocTra) => truyenDuocTra.truyenDuocThue,
  )
  truyenDuocTra: TruyenDuocTra;
}
