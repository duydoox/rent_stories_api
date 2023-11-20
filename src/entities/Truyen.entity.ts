import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CuaHang } from './CuaHang.entity';

@Entity()
export class Truyen {
  @PrimaryGeneratedColumn()
  maTruyen: string;

  @Column()
  tenTruyen: string;

  @Column({ nullable: true })
  namSanXuat: number;

  @Column()
  tacGia: string;

  @Column('float')
  giaThue: number;

  @Column()
  soLuong: number;

  @Column({ nullable: true })
  ghiChu: string;

  @ManyToOne(() => CuaHang, (cuaHang) => cuaHang.truyens)
  cuaHang: CuaHang;

  constructor(partial?: Partial<Truyen>) {
    Object.assign(this, partial);
  }
}
