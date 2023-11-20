import { IsNotEmpty } from 'class-validator';

export class ThemTruyenDuocThueDTO {
  @IsNotEmpty()
  giaThue: number;

  @IsNotEmpty()
  ngayThue: Date;

  @IsNotEmpty()
  ngayPhaiTra: Date;
}
