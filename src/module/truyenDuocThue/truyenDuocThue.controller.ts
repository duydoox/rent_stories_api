import { Body, Controller, Post, Get, Param, Query } from '@nestjs/common';
import { TruyenDuocThueService } from './truyenDuocThue.service';
import { ThemTruyenDuocThueDTO } from './dto';

@Controller('truyenDuocThue')
export class TruyenDuocThueController {
  constructor(private truyenDuocThueService: TruyenDuocThueService) {}

  @Get()
  layTatCaTruyenDuocThue() {
    return this.truyenDuocThueService.getTatCaTruyenDuocThue();
  }

  @Get('/danhSachThue')
  getDanhSachThue(
    @Query('maKhachHang') maKhachHang: string,
    @Query('isUnpaid') isUnpaid?: boolean,
  ) {
    return this.truyenDuocThueService.getTruyenDuocThueTheoKhachHang(
      maKhachHang,
      isUnpaid,
    );
  }

  @Get('/:maTruyenDuocThue')
  themTruyenDuocThue(@Param('maTruyenDuocThue') maTruyenDuocThue: string) {
    return this.truyenDuocThueService.getTruyenDuocThueByMa(maTruyenDuocThue);
  }

  @Post('/themTruyenDuocThue')
  login(@Body() body: ThemTruyenDuocThueDTO) {
    return this.truyenDuocThueService.themTruyenDuocThue(body);
  }

  @Post('/tinhTien')
  tinhTien(@Body() body: ThemTruyenDuocThueDTO) {
    return this.truyenDuocThueService.tinhTien(body);
  }
}
