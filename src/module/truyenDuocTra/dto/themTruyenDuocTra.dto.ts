import { IsNotEmpty } from 'class-validator';

export class ThemTruyenDuocTraDTO {
  @IsNotEmpty()
  tienDaTra: number;

  @IsNotEmpty()
  ngayTra: Date;

  tienPhat: number;
  lyDoPhat: string;
}
