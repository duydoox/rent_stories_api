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

@Entity()
export class TruyenDuocTra {
  @PrimaryGeneratedColumn()
  maTruyenDuocTra: string;

  @Column('float', { nullable: true })
  tienPhat: number;

  @Column('float')
  tienDaTra: number;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  ngayTra: Date;

  @Column({ nullable: true })
  lyDoPhat: string;

  @OneToOne(
    () => TruyenDuocThue,
    (truyenDuocThue) => truyenDuocThue.truyenDuocTra,
  )
  @JoinColumn()
  truyenDuocThue: TruyenDuocThue;

  @ManyToOne(() => HoaDon)
  hoaDon: HoaDon;
}
