import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuaHang } from 'src/entities';
import { CuaHangService } from './cuaHang.service';
import { CuaHangController } from './cuaHang.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CuaHang])],
  controllers: [CuaHangController],
  providers: [CuaHangService],
  exports: [CuaHangService],
})
export class CuaHangModule {}
