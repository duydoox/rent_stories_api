import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NhanVien } from 'src/entities';
import { NhanVienController } from './nhanVien.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NhanVien])],
  controllers: [NhanVienController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
