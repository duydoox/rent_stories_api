import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import {
  CuaHang,
  HoaDon,
  KhachHang,
  NhanVien,
  PhieuThue,
  Truyen,
  TruyenDuocThue,
  TruyenDuocTra,
} from './entities';
import { AuthGuard } from './module/auth/auth.gaurd';
import { UserModule } from './module/nhanVien/user.module';
import { AuthModule } from './module/auth/auth.module';
import { CuaHangModule } from './module/cuaHang/cuaHang.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'duyduyduy',
      database: 'rentstories',
      entities: [
        NhanVien,
        CuaHang,
        Truyen,
        KhachHang,
        TruyenDuocTra,
        TruyenDuocThue,
        PhieuThue,
        HoaDon,
      ],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    CuaHangModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
