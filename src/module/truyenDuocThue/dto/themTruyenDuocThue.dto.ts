import { IsNotEmpty } from 'class-validator';

export class ThemTruyenDuocThueDTO {
  ngayThue: string;

  @IsNotEmpty()
  ngayPhaiTra: string;

  @IsNotEmpty()
  maTruyen: string;
}
