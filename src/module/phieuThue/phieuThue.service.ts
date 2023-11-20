import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhieuThue } from 'src/entities';
import { Repository } from 'typeorm';
import { ThemPhieuThueDTO } from './dto';
import { Response } from 'src/types';

@Injectable()
export class PhieuThueService {
  constructor(
    @InjectRepository(PhieuThue)
    private phieuThueRepository: Repository<PhieuThue>,
  ) {}

  async themPhieuThue(
    phieuThueDto: ThemPhieuThueDTO,
  ): Promise<Response<PhieuThue[]> | null> {
    const phieuThue = new PhieuThue();
    phieuThue.ghiChu = phieuThueDto?.ghiChu;
    await this.phieuThueRepository.insert(phieuThue);
    return {
      data: null,
      status: 200,
      success: true,
    };
  }

  async getTatCaPhieuThue(): Promise<Response<PhieuThue[]> | null> {
    const phieuThues = await this.phieuThueRepository.find();
    return {
      data: phieuThues,
      status: 200,
      success: true,
    };
  }

  async getPhieuThueByMa(
    maPhieuThue: string,
  ): Promise<Response<PhieuThue> | null> {
    const phieuThue = await this.phieuThueRepository.findOneBy({ maPhieuThue });
    return {
      data: phieuThue,
      status: 200,
      success: true,
    };
  }
}
