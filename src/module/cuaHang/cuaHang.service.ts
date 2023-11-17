import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CuaHang } from 'src/entities';
import { Repository } from 'typeorm';
import { ThemCuaHangDTO } from './dto';
import { Response } from 'src/types';

@Injectable()
export class CuaHangService {
  constructor(
    @InjectRepository(CuaHang)
    private cuaHangRepository: Repository<CuaHang>,
  ) {}

  async themCuaHang(
    cuaHangDto: ThemCuaHangDTO,
  ): Promise<Response<CuaHang[]> | null> {
    const cuaHang = new CuaHang(cuaHangDto);
    await this.cuaHangRepository.insert(cuaHang);
    return {
      data: null,
      status: 200,
      success: true,
    };
  }

  async getTatCaCuaHang(): Promise<Response<CuaHang[]> | null> {
    const cuaHangs = await this.cuaHangRepository.find();
    return {
      data: cuaHangs,
      status: 200,
      success: true,
    };
  }

  async getCuaHangByMa(maCuaHang: string): Promise<Response<CuaHang> | null> {
    const cuaHang = await this.cuaHangRepository.findOneBy({ maCuaHang });
    return {
      data: cuaHang,
      status: 200,
      success: true,
    };
  }
}
