import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HoaDon } from 'src/entities';
import { HoaDonService } from './hoaDon.service';
import { HoaDonController } from './hoaDon.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HoaDon])],
  controllers: [HoaDonController],
  providers: [HoaDonService],
  exports: [HoaDonService],
})
export class HoaDonModule {}
