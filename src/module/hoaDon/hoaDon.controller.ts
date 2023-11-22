import { Body, Controller, Post, Get, Param, Request } from '@nestjs/common';
import { HoaDonService } from './hoaDon.service';
import { TaoHoaDonDTO } from './dto';
import { IInfo } from 'src/types';

@Controller('HoaDon')
export class HoaDonController {
  constructor(private hoaDonService: HoaDonService) {}

  @Get()
  layTatCaHoaDon() {
    return this.hoaDonService.getTatCaHoaDon();
  }

  @Post('/taoHoaDon')
  taoHoaDon(@Body() body: TaoHoaDonDTO) {
    return this.hoaDonService.taoHoaDon(body);
  }

  @Post('/luuHoaDon')
  luuHoaDon(@Body() body: TaoHoaDonDTO, @Request() req: any) {
    const user = req.user as IInfo;
    return this.hoaDonService.luuHoaDon(body, user.sub);
  }

  @Get('/:maHoaDon')
  themHoaDon(@Param('maHoaDon') maHoaDon: string) {
    return this.hoaDonService.getHoaDonByMa(maHoaDon);
  }

  @Post('/themHoaDon')
  login(@Body() body: TaoHoaDonDTO) {
    return this.hoaDonService.themHoaDon(body);
  }
}
