import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HoaDon } from 'src/entities';
import { Repository } from 'typeorm';
import { ThemHoaDonDTO } from './dto';
import { Response } from 'src/types';

@Injectable()
export class HoaDonService {
  constructor(
    @InjectRepository(HoaDon)
    private HoaDonRepository: Repository<HoaDon>,
  ) {}

  async themHoaDon(
    hoaDonDto: ThemHoaDonDTO,
  ): Promise<Response<HoaDon[]> | null> {
    const hoaDon = new HoaDon();
    hoaDon.ghiChu = hoaDonDto?.ghiChu;
    hoaDon.tongTien = hoaDonDto?.tongTien;
    await this.HoaDonRepository.insert(hoaDon);
    return {
      data: null,
      status: 200,
      success: true,
    };
  }

  async getTatCaHoaDon(): Promise<Response<HoaDon[]> | null> {
    const hoaDons = await this.HoaDonRepository.find();
    return {
      data: hoaDons,
      status: 200,
      success: true,
    };
  }

  async getHoaDonByMa(maHoaDon: string): Promise<Response<HoaDon> | null> {
    const hoaDon = await this.HoaDonRepository.findOneBy({ maHoaDon });
    return {
      data: hoaDon,
      status: 200,
      success: true,
    };
  }
}
