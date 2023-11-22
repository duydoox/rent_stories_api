import { Body, Controller, Post, Get, Param, Request } from '@nestjs/common';
import { PhieuThueService } from './phieuThue.service';
import { ThemPhieuThueDTO } from './dto';
import { IInfo } from 'src/types';

@Controller('phieuThue')
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
  login(@Body() body: ThemPhieuThueDTO, @Request() req: any) {
    const user = req.user as IInfo;
    return this.phieuThueService.themPhieuThue(body, user.sub);
  }
}
