import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Truyen } from './Truyen.entity';
import { PhieuThue } from './PhieuThue.entity';

@Entity()
export class TruyenDuocThue {
  @PrimaryGeneratedColumn()
  maTruyenDuocThue: string;

  @Column('float')
  giaThue: number;

  @Column({ default: new Date() })
  ngayThue: Date;

  @Column()
  ngayPhaiTra: Date;

  @ManyToOne(() => Truyen)
  truyen: Date;

  @ManyToOne(() => PhieuThue)
  phieuThue: PhieuThue;
}
