import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { IInfo } from 'src/types';

@Controller('nhanVien')
@UseInterceptors(ClassSerializerInterceptor)
export class NhanVienController {
  constructor(private nhanVienService: UserService) {}

  @Get('/layThongTin')
  layThongTin(@Request() request: any) {
    const user = request?.user as IInfo;
    return this.nhanVienService.layThongTin(user.sub);
  }
}
