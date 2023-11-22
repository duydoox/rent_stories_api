import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TruyenDuocThue } from 'src/entities';
import { In, Repository } from 'typeorm';
import { ThemTruyenDuocThueDTO } from './dto';
import { Response } from 'src/types';
import { TruyenService } from '../truyen/truyen.service';

@Injectable()
export class TruyenDuocThueService {
  constructor(
    @InjectRepository(TruyenDuocThue)
    private truyenDuocThueRepository: Repository<TruyenDuocThue>,
    private truyenService: TruyenService,
  ) {}

  async themTruyenDuocThue(
    truyenDuocThueDto: ThemTruyenDuocThueDTO,
  ): Promise<Response<TruyenDuocThue[]> | null> {
    const truyen = await this.truyenService.getTruyenRepo(
      truyenDuocThueDto.maTruyen,
    );
    if (!truyen) {
      throw new BadRequestException('Truyện không hợp lệ');
    }
    const truyenDuocThue = new TruyenDuocThue();
    truyenDuocThue.giaThue = truyen?.giaThue;
    truyenDuocThue.ngayThue = new Date(truyenDuocThueDto.ngayThue);
    truyenDuocThue.ngayPhaiTra = new Date(truyenDuocThueDto?.ngayPhaiTra);
    truyenDuocThue.truyen = truyen;
    await this.truyenDuocThueRepository.save(truyenDuocThue);
    return {
      data: null,
      status: 200,
      success: true,
    };
  }

  getListTruyenDuocThue(dsMaTruyenDuocThue: string[]) {
    return this.truyenDuocThueRepository.find({
      where: {
        maTruyenDuocThue: In(dsMaTruyenDuocThue),
      },
      relations: { truyen: true },
    });
  }

  async getTatCaTruyenDuocThue(): Promise<Response<TruyenDuocThue[]> | null> {
    const truyenDuocThues = await this.truyenDuocThueRepository.find();
    return {
      data: truyenDuocThues,
      status: 200,
      success: true,
    };
  }

  async getTruyenDuocThueByMa(
    maTruyenDuocThue: string,
  ): Promise<Response<TruyenDuocThue> | null> {
    const truyenDuocThue = await this.truyenDuocThueRepository.findOneBy({
      maTruyenDuocThue,
    });
    return {
      data: truyenDuocThue,
      status: 200,
      success: true,
    };
  }

  async tinhTien(
    dto: ThemTruyenDuocThueDTO,
  ): Promise<Response<TruyenDuocThue> | null> {
    const truyen = await this.truyenService.getTruyenRepo(dto.maTruyen);
    if (!truyen) {
      throw new BadRequestException('Truyện không hợp lệ');
    }
    const truyenDuocThue = new TruyenDuocThue();
    truyenDuocThue.truyen = truyen;
    truyenDuocThue.giaThue = truyen?.giaThue;
    truyenDuocThue.ngayThue = new Date(dto.ngayThue);
    truyenDuocThue.ngayPhaiTra = new Date(dto.ngayPhaiTra);
    truyenDuocThue.tinhTien();
    return {
      data: truyenDuocThue,
      status: 200,
      success: true,
    };
  }

  async getTruyenDuocThueTheoKhachHang(
    maKhachHang: string,
    isUnpaid?: boolean,
  ): Promise<Response<TruyenDuocThue[]> | null> {
    let truyenDuocThues = await this.truyenDuocThueRepository.find({
      where: {
        phieuThue: {
          khachHang: {
            maKhachHang,
          },
        },
      },
      relations: { truyenDuocTra: true, truyen: true, phieuThue: true },
      order: { ngayPhaiTra: 'ASC' },
    });
    if (isUnpaid) {
      truyenDuocThues = truyenDuocThues.filter(
        (item) => item.truyenDuocTra === null,
      );
    }
    return {
      data: truyenDuocThues,
      status: 200,
      success: true,
    };
  }
}
