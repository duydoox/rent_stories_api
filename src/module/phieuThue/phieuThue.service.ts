import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhieuThue, TruyenDuocThue } from 'src/entities';
import { Repository } from 'typeorm';
import { ThemPhieuThueDTO } from './dto';
import { Response } from 'src/types';
import { UserService } from '../nhanVien/user.service';
import { KhachHangService } from '../khachHang/khachHang.service';
import { TruyenService } from '../truyen/truyen.service';

@Injectable()
export class PhieuThueService {
  constructor(
    @InjectRepository(PhieuThue)
    private phieuThueRepository: Repository<PhieuThue>,
    private userService: UserService,
    private khachHangService: KhachHangService,
    private truyenService: TruyenService,
  ) {}

  async themPhieuThueRepo(phieuThueDto: ThemPhieuThueDTO, maNhanVien: string) {
    const khachHang = await this.khachHangService.getKhachHangRepo(
      phieuThueDto.maKhachHang,
    );
    if (!khachHang) {
      throw new NotFoundException('khách hàng không hợp lệ');
    }
    const nhanVien = await this.userService.getNhanVienRepo(maNhanVien);
    if (!nhanVien) {
      throw new NotFoundException('nhân viên không hợp lệ');
    }
    const truyens = await this.truyenService.getListTruyen(
      phieuThueDto.dsTruyenDuocThue.map((t) => t.maTruyen),
    );
    const dsTruyenDuocThue = phieuThueDto.dsTruyenDuocThue.map((tdt) => {
      const truyen = truyens.find((v) => v.maTruyen === tdt.maTruyen);
      if (!truyen) {
        throw new BadRequestException('Truyện không hợp lệ');
      }
      if (truyen.soLuong <= 0) {
        throw new BadRequestException(`Truyện ${truyen.tenTruyen} đã hết`);
      }
      truyen.soLuong -= 1;
      const truyenDuocThue = new TruyenDuocThue();
      truyenDuocThue.truyen = truyen;
      truyenDuocThue.giaThue = truyen?.giaThue;
      truyenDuocThue.ngayThue = new Date(tdt.ngayThue);
      truyenDuocThue.ngayPhaiTra = new Date(tdt.ngayPhaiTra);
      truyenDuocThue.tinhTien();
      return truyenDuocThue;
    });
    const phieuThue = new PhieuThue();
    phieuThue.ghiChu = phieuThueDto?.ghiChu;
    phieuThue.khachHang = khachHang;
    phieuThue.nhanVien = nhanVien;
    phieuThue.truyenDuocThue = dsTruyenDuocThue;
    return this.phieuThueRepository.save(phieuThue);
  }

  async themPhieuThue(
    phieuThueDto: ThemPhieuThueDTO,
    maNhanVien: string,
  ): Promise<Response<PhieuThue[]> | null> {
    await this.themPhieuThueRepo(phieuThueDto, maNhanVien);
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
