import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NhanVien } from 'src/entities';
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
}
