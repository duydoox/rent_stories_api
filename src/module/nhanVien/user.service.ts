import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NhanVien } from 'src/entities';
import { Response } from 'src/types';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(NhanVien)
    private userRepository: Repository<NhanVien>,
  ) {}

  async insertUser(nhanVien: NhanVien): Promise<void> {
    await this.userRepository.insert(nhanVien);
  }

  findByUsername(username: string): Promise<NhanVien | null> {
    return this.userRepository.findOneBy({ username });
  }

  async layThongTin(maNhanVien: string): Promise<Response<NhanVien> | null> {
    try {
      const nhanVien: NhanVien | null = await this.userRepository
        .createQueryBuilder('nv')
        .leftJoinAndSelect('nv.cuaHang', 'cuaHang')
        .where('nv.maNhanVien = :maNhanVien')
        .setParameters({
          maNhanVien,
        })
        .getOne();
      return {
        data: nhanVien,
        status: 200,
        success: true,
      };
    } catch (err) {
      throw new ForbiddenException('Lỗi: ' + err);
    }
  }
}
