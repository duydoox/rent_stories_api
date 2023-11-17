import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { Public } from 'src/decorator/public.decorator';
import { CuaHangService } from './cuaHang.service';
import { ThemCuaHangDTO } from './dto';

@Controller('cuaHang')
@Public()
export class CuaHangController {
  constructor(private cuaHangService: CuaHangService) {}

  @Get()
  layTatCaCuaHang() {
    return this.cuaHangService.getTatCaCuaHang();
  }

  @Get('/:maCuaHang')
  themCuaHang(@Param('maCuaHang') maCuaHang: string) {
    return this.cuaHangService.getCuaHangByMa(maCuaHang);
  }

  @Post('/themCuaHang')
  login(@Body() body: ThemCuaHangDTO) {
    return this.cuaHangService.themCuaHang(body);
  }
}
