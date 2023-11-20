import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TruyenDuocThue } from 'src/entities';
import { Repository } from 'typeorm';
import { ThemTruyenDuocThueDTO } from './dto';
import { Response } from 'src/types';

@Injectable()
export class TruyenDuocThueService {
  constructor(
    @InjectRepository(TruyenDuocThue)
    private TruyenDuocThueRepository: Repository<TruyenDuocThue>,
  ) {}

  async themTruyenDuocThue(
    truyenDuocThueDto: ThemTruyenDuocThueDTO,
  ): Promise<Response<TruyenDuocThue[]> | null> {
    const truyenDuocThue = new TruyenDuocThue();
    truyenDuocThue.giaThue = truyenDuocThueDto?.giaThue;
    truyenDuocThue.ngayThue = truyenDuocThueDto?.ngayThue;
    truyenDuocThue.ngayPhaiTra = truyenDuocThueDto?.ngayPhaiTra;
    await this.TruyenDuocThueRepository.insert(truyenDuocThue);
    return {
      data: null,
      status: 200,
      success: true,
    };
  }

  async getTatCaTruyenDuocThue(): Promise<Response<TruyenDuocThue[]> | null> {
    const truyenDuocThues = await this.TruyenDuocThueRepository.find();
    return {
      data: truyenDuocThues,
      status: 200,
      success: true,
    };
  }

  async getTruyenDuocThueByMa(
    maTruyenDuocThue: string,
  ): Promise<Response<TruyenDuocThue> | null> {
    const truyenDuocThue = await this.TruyenDuocThueRepository.findOneBy({
      maTruyenDuocThue,
    });
    return {
      data: truyenDuocThue,
      status: 200,
      success: true,
    };
  }
}
