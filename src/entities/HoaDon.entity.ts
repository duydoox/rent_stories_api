import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { NhanVien } from './NhanVien.entity';

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
}
