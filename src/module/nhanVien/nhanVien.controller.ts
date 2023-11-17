import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('nhanVien')
@UseInterceptors(ClassSerializerInterceptor)
export class NhanVienController {
  constructor(private nhanVienService: UserService) {}

  @Get('/layThongTin')
  layThongTin(@Request() request: any) {
    return this.nhanVienService.layThongTin(request?.user?.sub);
  }
}
