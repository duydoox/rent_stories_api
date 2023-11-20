import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhieuThue } from 'src/entities';
import { PhieuThueService } from './phieuThue.service';
import { PhieuThueController } from './phieuThue.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PhieuThue])],
  controllers: [PhieuThueController],
  providers: [PhieuThueService],
  exports: [PhieuThueService],
})
export class PhieuThueModule {}
