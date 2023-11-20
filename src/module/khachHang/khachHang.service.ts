import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KhachHang } from 'src/entities';
import { Repository } from 'typeorm';
import { ThemKhachHangDTO } from './dto';
import { Response } from 'src/types';

@Injectable()
export class KhachHangService {
  constructor(
    @InjectRepository(KhachHang)
    private khachHangRepository: Repository<KhachHang>,
  ) {}

  async themKhachHang(
    khachHangDto: ThemKhachHangDTO,
  ): Promise<Response<KhachHang[]> | null> {
    const khachHang = new KhachHang(khachHangDto);
    await this.khachHangRepository.insert(khachHang);
    return {
      data: null,
      status: 200,
      success: true,
    };
  }

  async getTatCaKhachHang(): Promise<Response<KhachHang[]> | null> {
    const khachHangs = await this.khachHangRepository.find();
    return {
      data: khachHangs,
      status: 200,
      success: true,
    };
  }

  async getKhachHangByMa(
    maKhachHang: string,
  ): Promise<Response<KhachHang> | null> {
    const khachHang = await this.khachHangRepository.findOneBy({ maKhachHang });
    return {
      data: khachHang,
      status: 200,
      success: true,
    };
  }
}
