import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';

export class ThemTruyenDTO {
  @IsNotEmpty()
  tenTruyen: string;

  namSanXuat: number;
  tacGia: string;

  @IsNotEmpty()
  giaThue: number;

  @IsNotEmpty()
  soLuong: number;

  ghiChu: string;
}

export class SuaTruyenDTO extends PartialType(ThemTruyenDTO) {}
