import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TruyenDuocTra } from 'src/entities';
import { Between, Repository } from 'typeorm';
import {
  ChiTietThongKeDto,
  GetThongKeDTO,
  IThongKe,
  ThemTruyenDuocTraDTO,
} from './dto';
import { Response } from 'src/types';

@Injectable()
export class TruyenDuocTraService {
  constructor(
    @InjectRepository(TruyenDuocTra)
    private TruyenDuocTraRepository: Repository<TruyenDuocTra>,
  ) {}

  async themTruyenDuocTra(
    truyenDuocTraDto: ThemTruyenDuocTraDTO,
  ): Promise<Response<TruyenDuocTra[]> | null> {
    const truyenDuocTra = new TruyenDuocTra();
    truyenDuocTra.ngayTra = truyenDuocTraDto?.ngayTra;
    await this.TruyenDuocTraRepository.insert(truyenDuocTra);
    return {
      data: null,
      status: 200,
      success: true,
    };
  }

  async getTatCaTruyenDuocTra(): Promise<Response<TruyenDuocTra[]> | null> {
    const truyenDuocTras = await this.TruyenDuocTraRepository.find();
    return {
      data: truyenDuocTras,
      status: 200,
      success: true,
    };
  }

  async getTruyenDuocTraByMa(
    maTruyenDuocTra: string,
  ): Promise<Response<TruyenDuocTra> | null> {
    const truyenDuocTra = await this.TruyenDuocTraRepository.findOneBy({
      maTruyenDuocTra,
    });
    return {
      data: truyenDuocTra,
      status: 200,
      success: true,
    };
  }

  async getThongKe(dto: GetThongKeDTO): Promise<Response<IThongKe[]> | null> {
    const rawResult: IThongKe[] =
      await this.TruyenDuocTraRepository.createQueryBuilder('truyenDuocTra')
        .select(
          'truyen.maTruyen, truyen.tenTruyen, COUNT(truyenDuocTra.maTruyenDuocTra) as soLuong, SUM(truyenDuocTra.tienDaTra) as tienDaTra',
        )
        .leftJoin('truyenDuocTra.truyenDuocThue', 'truyenDuocThue')
        .leftJoin('truyenDuocThue.truyen', 'truyen')
        .where('truyenDuocTra.ngayTra BETWEEN :startDate AND :endDate', {
          startDate: dto.ngayBatDau,
          endDate: dto.ngayKetThuc,
        })
        .groupBy('truyen.maTruyen, truyen.tenTruyen')
        .orderBy('soLuong', 'DESC')
        .addOrderBy('tienDaTra', 'DESC')
        .getRawMany();
    return {
      data: rawResult,
      status: 200,
      success: true,
    };
  }

  async getChiTietThongKe(
    dto: ChiTietThongKeDto,
  ): Promise<Response<TruyenDuocTra[]> | null> {
    const truyenDuocTras = await this.TruyenDuocTraRepository.find({
      where: {
        truyenDuocThue: {
          truyen: {
            maTruyen: dto.maTruyen,
          },
        },
        ngayTra: Between(new Date(dto.ngayBatDau), new Date(dto.ngayKetThuc)),
      },
      relations: {
        truyenDuocThue: {
          phieuThue: {
            khachHang: true,
          },
        },
      },
    });
    return {
      data: truyenDuocTras,
      status: 200,
      success: true,
    };
  }
}
