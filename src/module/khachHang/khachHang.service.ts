import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KhachHang } from 'src/entities';
import { Like, Repository } from 'typeorm';
import { ThemKhachHangDTO } from './dto';
import { Response } from 'src/types';

@Injectable()
export class KhachHangService {
  constructor(
    @InjectRepository(KhachHang)
    private khachHangRepository: Repository<KhachHang>,
  ) {}

  async getKhachHangRepo(maKhachHang: string) {
    return this.khachHangRepository.findOneBy({ maKhachHang });
  }

  async themKhachHang(
    khachHangDto: ThemKhachHangDTO,
  ): Promise<Response<KhachHang> | null> {
    const khachHang = new KhachHang(khachHangDto);
    const saved = await this.khachHangRepository.save(khachHang);
    return {
      data: saved,
      status: 200,
      success: true,
    };
  }

  async getTatCaKhachHang(
    keyword?: string,
  ): Promise<Response<KhachHang[]> | null> {
    const khachHangs = await this.khachHangRepository.find({
      where: {
        tenKhachHang: Like(`%${keyword ?? ''}%`),
      },
    });
    return {
      data: khachHangs,
      status: 200,
      success: true,
    };
  }

  async getKhachHangByMa(
    maKhachHang: string,
  ): Promise<Response<KhachHang> | null> {
    const khachHang = await this.getKhachHangRepo(maKhachHang);
    return {
      data: khachHang,
      status: 200,
      success: true,
    };
  }
}
