import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { Public } from 'src/decorator/public.decorator';
import { KhachHangService } from './khachHang.service';
import { ThemKhachHangDTO } from './dto';

@Controller('khachHang')
@Public()
export class KhachHangController {
  constructor(private khachHangService: KhachHangService) {}

  @Get()
  layTatCaKhachHang() {
    return this.khachHangService.getTatCaKhachHang();
  }

  @Get('/:maKhachHang')
  themCuaHang(@Param('maKhachHang') maKhachHang: string) {
    return this.khachHangService.getKhachHangByMa(maKhachHang);
  }

  @Post('/themKhachHang')
  login(@Body() body: ThemKhachHangDTO) {
    return this.khachHangService.themKhachHang(body);
  }
}
