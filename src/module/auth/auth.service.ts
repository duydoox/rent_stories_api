import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from './dto';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { NhanVien } from 'src/entities';
import { UserService } from '../nhanVien/user.service';
import { IInfo, Response } from 'src/types';

@Injectable()
export class AuthService {
  constructor(
    private userSevice: UserService,
    private jwtSevice: JwtService,
  ) {}

  async register(registerDTO: RegisterDTO): Promise<Response<boolean> | null> {
    const hashedPassword = await argon.hash(registerDTO.password);
    try {
      const nhanVien = new NhanVien({
        username: registerDTO.username,
        password: hashedPassword,
        viTri: 'NV',
      });
      await this.userSevice.insertUser(nhanVien);
      return {
        data: null,
        status: 200,
        success: true,
        message: 'Đăng ký tài khoản thành công',
      };
    } catch (error) {
      throw new ForbiddenException('Tài khoản đã tồn tại');
    }
  }

  async login(
    loginDTO: LoginDTO,
  ): Promise<Response<{ accessToken: string; nhanVien: NhanVien }> | null> {
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
    const payload: IInfo = {
      sub: nhanVien.maNhanVien,
      username: nhanVien.username,
    };
    return {
      data: {
        accessToken: await this.jwtSevice.signAsync(payload),
        nhanVien: nhanVien,
      },
      status: 200,
      success: true,
    };
  }
}
