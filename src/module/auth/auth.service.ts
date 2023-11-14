import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from './dto';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { NhanVien } from 'src/entities';
import { UserService } from '../nhanVien/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userSevice: UserService,
    private jwtSevice: JwtService,
  ) {}

  async register(registerDTO: RegisterDTO) {
    const hashedPassword = await argon.hash(registerDTO.password);
    try {
      const nhanVien = new NhanVien();
      nhanVien.username = registerDTO.username;
      nhanVien.password = hashedPassword;
      nhanVien.viTri = 'NV';
      await this.userSevice.insertUser(nhanVien);
      return {
        message: 'Đăng ký tài khoản thành công',
      };
    } catch (error) {
      throw new ForbiddenException('Tài khoản đã tồn tại');
    }
  }

  async login(loginDTO: LoginDTO) {
    const nhanVien = await this.userSevice.findByUsername(loginDTO.username);
    if (!nhanVien) {
      throw new ForbiddenException('Tài khoản hoặc mật khẩu không chính xác');
    }
    const passwordMatched = await argon.verify(
      nhanVien?.password,
      loginDTO.password,
    );
    if (!passwordMatched) {
      throw new ForbiddenException('Tài khoản hoặc mật khẩu không chính xác');
    }
    const payload = { sub: nhanVien.maNhanVien, username: nhanVien.username };
    return {
      accessToken: await this.jwtSevice.signAsync(payload),
    };
  }
}