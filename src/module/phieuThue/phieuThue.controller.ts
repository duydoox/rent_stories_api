import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { Public } from 'src/decorator/public.decorator';
import { PhieuThueService } from './phieuThue.service';
import { ThemPhieuThueDTO } from './dto';

@Controller('phieuThue')
@Public()
export class PhieuThueController {
  constructor(private phieuThueService: PhieuThueService) {}

  @Get()
  layTatCaPhieuThue() {
    return this.phieuThueService.getTatCaPhieuThue();
  }

  @Get('/:maPhieuThue')
  themPhieuThue(@Param('maPhieuThue') maPhieuThue: string) {
    return this.phieuThueService.getPhieuThueByMa(maPhieuThue);
  }

  @Post('/themPhieuThue')
  login(@Body() body: ThemPhieuThueDTO) {
    return this.phieuThueService.themPhieuThue(body);
  }
}
