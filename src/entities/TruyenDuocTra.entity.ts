import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { HoaDon } from './HoaDon.entity';
import { TruyenDuocThue } from './TruyenDuocThue';

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

  @ManyToOne(() => TruyenDuocThue)
  truyenDuocThue: TruyenDuocThue;

  @ManyToOne(() => HoaDon)
  hoaDon: HoaDon;
}
