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

  @Column()
  ngayTra: Date;

  @Column('float', { default: 0 })
  tienPhat: number;

  @Column({ nullable: true })
  lyDoPhat: string;

  @Column('float')
  tienDaTra: number;

  @OneToOne(
    () => TruyenDuocThue,
    (truyenDuocThue) => truyenDuocThue.truyenDuocTra,
  )
  @JoinColumn()
  truyenDuocThue: TruyenDuocThue;

  @ManyToOne(() => HoaDon)
  hoaDon: HoaDon;
}
