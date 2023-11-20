import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KhachHang } from 'src/entities';
import { KhachHangService } from './khachHang.service';
import { KhachHangController } from './khachHang.controller';

@Module({
  imports: [TypeOrmModule.forFeature([KhachHang])],
  controllers: [KhachHangController],
  providers: [KhachHangService],
  exports: [KhachHangService],
})
export class KhachHangModule {}
