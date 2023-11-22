import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TruyenDuocThue } from 'src/entities';
import { TruyenDuocThueService } from './truyenDuocThue.service';
import { TruyenDuocThueController } from './truyenDuocThue.controller';
import { TruyenModule } from '../truyen/truyen.module';
import { KhachHangModule } from '../khachHang/khachHang.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TruyenDuocThue]),
    TruyenModule,
    KhachHangModule,
  ],
  controllers: [TruyenDuocThueController],
  providers: [TruyenDuocThueService],
  exports: [TruyenDuocThueService],
})
export class TruyenDuocThueModule {}
