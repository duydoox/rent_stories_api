import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Truyen } from 'src/entities';
import { TruyenService } from './truyen.service';
import { TruyenController } from './truyen.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Truyen])],
  controllers: [TruyenController],
  providers: [TruyenService],
  exports: [TruyenService],
})
export class TruyenModule {}
