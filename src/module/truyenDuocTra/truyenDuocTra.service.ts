import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TruyenDuocTra } from 'src/entities';
import { Repository } from 'typeorm';
import { ThemTruyenDuocTraDTO } from './dto';
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
}
