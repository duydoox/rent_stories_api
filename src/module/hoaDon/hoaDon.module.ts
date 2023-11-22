import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HoaDon } from 'src/entities';
import { HoaDonService } from './hoaDon.service';
import { HoaDonController } from './hoaDon.controller';
import { UserModule } from '../nhanVien/user.module';
import { TruyenDuocThueModule } from '../truyenDuocThue/truyenDuocThue.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([HoaDon]),
    UserModule,
    TruyenDuocThueModule,
  ],
  controllers: [HoaDonController],
  providers: [HoaDonService],
  exports: [HoaDonService],
})
export class HoaDonModule {}
