import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhieuThue } from 'src/entities';
import { PhieuThueService } from './phieuThue.service';
import { PhieuThueController } from './phieuThue.controller';
import { KhachHangModule } from '../khachHang/khachHang.module';
import { UserModule } from '../nhanVien/user.module';
import { TruyenModule } from '../truyen/truyen.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PhieuThue]),
    KhachHangModule,
    UserModule,
    TruyenModule,
  ],
  controllers: [PhieuThueController],
  providers: [PhieuThueService],
  exports: [PhieuThueService],
})
export class PhieuThueModule {}
