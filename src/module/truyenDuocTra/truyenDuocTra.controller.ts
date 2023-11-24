import { Body, Controller, Post, Get, Param, Query } from '@nestjs/common';
import { TruyenDuocTraService } from './truyenDuocTra.service';
import { ChiTietThongKeDto, GetThongKeDTO, ThemTruyenDuocTraDTO } from './dto';

@Controller('truyenDuocTra')
export class TruyenDuocTraController {
  constructor(private truyenDuocTraService: TruyenDuocTraService) {}

  @Get()
  layTatCaTruyenDuocTra() {
    return this.truyenDuocTraService.getTatCaTruyenDuocTra();
  }

  @Get('/chiTietThongKe')
  getChiTietThongKe(@Query() dto: ChiTietThongKeDto) {
    return this.truyenDuocTraService.getChiTietThongKe(dto);
  }

  @Get('/thongKe')
  getThongKe(@Query() dto: GetThongKeDTO) {
    return this.truyenDuocTraService.getThongKe(dto);
  }

  @Get('/:maTruyenDuocTra')
  themTruyenDuocTra(@Param('maTruyenDuocTra') maTruyenDuocTra: string) {
    return this.truyenDuocTraService.getTruyenDuocTraByMa(maTruyenDuocTra);
  }

  @Post('/themTruyenDuocTra')
  login(@Body() body: ThemTruyenDuocTraDTO) {
    return this.truyenDuocTraService.themTruyenDuocTra(body);
  }
}
