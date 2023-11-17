import { IsNotEmpty } from 'class-validator';

export class ThemCuaHangDTO {
  @IsNotEmpty()
  tenCuaHang: string;

  diaChi: string;
  moTa: string;
}
