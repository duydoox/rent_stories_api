import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { Public } from 'src/decorator/public.decorator';
import { HoaDonService } from './hoaDon.service';
import { ThemHoaDonDTO } from './dto';

@Controller('HoaDon')
@Public()
export class HoaDonController {
  constructor(private hoaDonService: HoaDonService) {}

  @Get()
  layTatCaHoaDon() {
    return this.hoaDonService.getTatCaHoaDon();
  }

  @Get('/:maHoaDon')
  themHoaDon(@Param('maHoaDon') maHoaDon: string) {
    return this.hoaDonService.getHoaDonByMa(maHoaDon);
  }

  @Post('/themHoaDon')
  login(@Body() body: ThemHoaDonDTO) {
    return this.hoaDonService.themHoaDon(body);
  }
}
