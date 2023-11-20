import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TruyenDuocThue } from 'src/entities';
import { TruyenDuocThueService } from './truyenDuocThue.service';
import { TruyenDuocThueController } from './truyenDuocThue.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TruyenDuocThue])],
  controllers: [TruyenDuocThueController],
  providers: [TruyenDuocThueService],
  exports: [TruyenDuocThueService],
})
export class TruyenDuocThueModule {}
