import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { Public } from 'src/decorator/public.decorator';
import { TruyenDuocThueService } from './truyenDuocThue.service';
import { ThemTruyenDuocThueDTO } from './dto';

@Controller('truyenDuocThue')
@Public()
export class TruyenDuocThueController {
  constructor(private truyenDuocThueService: TruyenDuocThueService) {}

  @Get()
  layTatCaTruyenDuocThue() {
    return this.truyenDuocThueService.getTatCaTruyenDuocThue();
  }

  @Get('/:maTruyenDuocThue')
  themTruyenDuocThue(@Param('maTruyenDuocThue') maTruyenDuocThue: string) {
    return this.truyenDuocThueService.getTruyenDuocThueByMa(maTruyenDuocThue);
  }

  @Post('/themTruyenDuocThue')
  login(@Body() body: ThemTruyenDuocThueDTO) {
    return this.truyenDuocThueService.themTruyenDuocThue(body);
  }
}
