import { IsNotEmpty } from 'class-validator';

export class ThemKhachHangDTO {
  @IsNotEmpty()
  tenKhachHang: string;

  @IsNotEmpty()
  soDienThoai: string;
}
