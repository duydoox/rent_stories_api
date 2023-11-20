import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { Public } from 'src/decorator/public.decorator';
import { TruyenDuocTraService } from './truyenDuocTra.service';
import { ThemTruyenDuocTraDTO } from './dto';

@Controller('khachHang')
@Public()
export class TruyenDuocTraController {
  constructor(private truyenDuocTraService: TruyenDuocTraService) {}

  @Get()
  layTatCaTruyenDuocTra() {
    return this.truyenDuocTraService.getTatCaTruyenDuocTra();
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
