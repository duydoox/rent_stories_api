import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Truyen } from 'src/entities';
import { Repository } from 'typeorm';
import { SuaTruyenDTO, ThemTruyenDTO } from './dto';
import { Response } from 'src/types';

@Injectable()
export class TruyenService {
  constructor(
    @InjectRepository(Truyen)
    private truyenRepository: Repository<Truyen>,
  ) {}

  async themTruyen(
    themTruyenDto: ThemTruyenDTO,
  ): Promise<Response<Truyen[]> | null> {
    const truyen = new Truyen(themTruyenDto);
    await this.truyenRepository.insert(truyen);
    return {
      data: null,
      status: 200,
      success: true,
    };
  }

  async getTatCaTruyen(): Promise<Response<Truyen[]> | null> {
    const truyens = await this.truyenRepository.find();
    return {
      data: truyens,
      status: 200,
      success: true,
    };
  }

  async getTruyenByMa(maTruyen: string): Promise<Response<Truyen> | null> {
    const cuaHang = await this.truyenRepository.findOneBy({ maTruyen });
    return {
      data: cuaHang,
      status: 200,
      success: true,
    };
  }

  async suaTruyen(
    maTruyen: string,
    truyenDto: SuaTruyenDTO,
  ): Promise<Response<Truyen> | null> {
    const truyen = await this.truyenRepository.findOneBy({ maTruyen });
    if (truyen) {
      Object.assign(truyen, truyenDto);
      await this.truyenRepository.save(truyen);
      return {
        data: truyen,
        status: 200,
        success: true,
      };
    } else {
      throw new NotFoundException('không tìm thầy truyện');
    }
  }

  async xoaTruyen(maTruyen: string): Promise<Response<null> | null> {
    await this.truyenRepository.delete({ maTruyen });
    return {
      data: null,
      status: 200,
      success: true,
    };
  }

  async timKiem(keyword: string): Promise<Response<Truyen[]> | null> {
    try {
      const truyens = await this.truyenRepository
        .createQueryBuilder('truyen')
        .where('truyen.tenTruyen LIKE :keyword', { keyword: `%${keyword}%` })
        .getMany();
      return {
        data: truyens,
        status: 200,
        success: true,
      };
    } catch (e) {
      throw new BadRequestException('');
    }
  }
}
