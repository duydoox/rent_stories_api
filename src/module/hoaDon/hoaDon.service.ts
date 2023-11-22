import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HoaDon, TruyenDuocTra } from 'src/entities';
import { Repository } from 'typeorm';
import { TaoHoaDonDTO } from './dto';
import { Response } from 'src/types';
import { UserService } from '../nhanVien/user.service';
import { TruyenDuocThueService } from '../truyenDuocThue/truyenDuocThue.service';

@Injectable()
export class HoaDonService {
  constructor(
    @InjectRepository(HoaDon)
    private hoaDonRepository: Repository<HoaDon>,
    private userService: UserService,
    private truyenDuocThueService: TruyenDuocThueService,
  ) {}

  async themHoaDon(
    hoaDonDto: TaoHoaDonDTO,
  ): Promise<Response<HoaDon[]> | null> {
    const hoaDon = new HoaDon();
    hoaDon.ghiChu = hoaDonDto?.ghiChu;
    await this.hoaDonRepository.insert(hoaDon);
    return {
      data: null,
      status: 200,
      success: true,
    };
  }

  async getTatCaHoaDon(): Promise<Response<HoaDon[]> | null> {
    const hoaDons = await this.hoaDonRepository.find();
    return {
      data: hoaDons,
      status: 200,
      success: true,
    };
  }

  async getHoaDonByMa(maHoaDon: string): Promise<Response<HoaDon> | null> {
    const hoaDon = await this.hoaDonRepository.findOneBy({ maHoaDon });
    return {
      data: hoaDon,
      status: 200,
      success: true,
    };
  }

  async khoiTaoHoaDon(hoaDonDto: TaoHoaDonDTO): Promise<HoaDon | null> {
    const dsTruyenDuocThue =
      await this.truyenDuocThueService.getListTruyenDuocThue(
        hoaDonDto.dsTruyenCanTra.map((v) => v.maTruyenDuocThue),
      );
    const truyenDuocTras: TruyenDuocTra[] = hoaDonDto.dsTruyenCanTra.map(
      (v) => {
        const truyenDuocThue = dsTruyenDuocThue.find(
          (t) => t.maTruyenDuocThue === v.maTruyenDuocThue,
        );
        if (!truyenDuocThue) {
          throw new NotFoundException('Không tìm thấy truyện thuê');
        }
        truyenDuocThue.truyen.soLuong += 1;
        const truyenDuocTra = new TruyenDuocTra();
        truyenDuocTra.ngayTra = new Date(v.ngayTra);
        truyenDuocTra.truyenDuocThue = truyenDuocThue;
        truyenDuocTra.tinhTien();
        return truyenDuocTra;
      },
    );
    const hoaDon = new HoaDon();
    hoaDon.ghiChu = hoaDonDto?.ghiChu;
    hoaDon.truyenDuocTras = truyenDuocTras;
    hoaDon.tinhTien();
    return hoaDon;
  }

  async taoHoaDon(hoaDonDto: TaoHoaDonDTO): Promise<Response<HoaDon> | null> {
    const hoaDon = await this.khoiTaoHoaDon(hoaDonDto);
    return {
      data: hoaDon,
      status: 200,
      success: true,
    };
  }

  async luuHoaDon(
    hoaDonDto: TaoHoaDonDTO,
    maNhanVien: string,
  ): Promise<Response<HoaDon> | null> {
    const nhanVien = await this.userService.getNhanVienRepo(maNhanVien);
    if (!nhanVien) {
      throw new NotFoundException('nhân viên không hợp lệ');
    }
    const hoaDon = await this.khoiTaoHoaDon(hoaDonDto);
    if (!hoaDon) {
      throw new BadRequestException();
    }
    hoaDon.nhanVien = nhanVien;
    await this.hoaDonRepository.save(hoaDon);
    return {
      data: null,
      status: 200,
      success: true,
    };
  }
}
