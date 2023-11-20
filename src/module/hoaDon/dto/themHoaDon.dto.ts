import { IsNotEmpty } from 'class-validator';

export class ThemHoaDonDTO {
  @IsNotEmpty()
  tongTien: number;

  ghiChu: string;
  moTa: string;
}
