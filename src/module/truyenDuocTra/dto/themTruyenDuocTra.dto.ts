import { IsNotEmpty } from 'class-validator';

export class ThemTruyenDuocTraDTO {
  @IsNotEmpty()
  ngayTra: Date;

  @IsNotEmpty()
  maTruyenDuocThue: string;
}
