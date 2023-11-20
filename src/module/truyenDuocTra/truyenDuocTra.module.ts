import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TruyenDuocTra } from 'src/entities';
import { TruyenDuocTraService } from './truyenDuocTra.service';
import { TruyenDuocTraController } from './truyenDuocTra.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TruyenDuocTra])],
  controllers: [TruyenDuocTraController],
  providers: [TruyenDuocTraService],
  exports: [TruyenDuocTraService],
})
export class TruyenDuocTraModule {}
