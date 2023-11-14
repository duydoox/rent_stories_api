import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NhanVien } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([NhanVien])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
