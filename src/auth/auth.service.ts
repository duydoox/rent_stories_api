import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from './dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private userSevice: UserService,
    private jwtSevice: JwtService,
  ) {}

  async register(registerDTO: RegisterDTO) {
    const hashedPassword = await argon.hash(registerDTO.password);
    try {
      await this.userSevice.insertUser(registerDTO.username, hashedPassword);
      return {
        message: 'Đăng ký tài khoản thành công',
      };
    } catch (error) {
      throw new ForbiddenException('Tài khoản đã tồn tại');
    }
  }

  async login(loginDTO: LoginDTO) {
    const user = await this.userSevice.findByUsername(loginDTO.username);
    if (!user) {
      throw new ForbiddenException('Tài khoản hoặc mật khẩu không chính xác');
    }
    const passwordMatched = await argon.verify(
      user?.passWord,
      loginDTO.password,
    );
    if (!passwordMatched) {
      throw new ForbiddenException('Tài khoản hoặc mật khẩu không chính xác');
    }
    const payload = { sub: user.ID, username: user.userName };
    return {
      accessToken: await this.jwtSevice.signAsync(payload),
    };
  }
}
