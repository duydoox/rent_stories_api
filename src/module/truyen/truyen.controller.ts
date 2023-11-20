import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { TruyenService } from './truyen.service';
import { ThemTruyenDTO } from './dto';

@Controller('truyen')
export class TruyenController {
  constructor(private truyenService: TruyenService) {}

  @Get()
  layTatCaTruyen() {
    return this.truyenService.getTatCaTruyen();
  }

  @Get('/timKiem')
  timKiem(@Query('keyword') keyword: string) {
    return this.truyenService.timKiem(keyword);
  }

  @Get('/:maTruyen')
  themCuaHang(@Param('maTruyen') maTruyen: string) {
    return this.truyenService.getTruyenByMa(maTruyen);
  }

  @Post()
  login(@Body() body: ThemTruyenDTO) {
    return this.truyenService.themTruyen(body);
  }

  @Put('/:maTruyen')
  suaTruyen(@Param('maTruyen') maTruyen: string, @Body() body: ThemTruyenDTO) {
    return this.truyenService.suaTruyen(maTruyen, body);
  }

  @Delete('/:maTruyen')
  xoaTruyen(@Param('maTruyen') maTruyen: string) {
    return this.truyenService.xoaTruyen(maTruyen);
  }
}
