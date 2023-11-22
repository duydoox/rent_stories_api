import { IsNotEmpty } from 'class-validator';
import { ThemTruyenDuocThueDTO } from 'src/module/truyenDuocThue/dto';

export class ThemPhieuThueDTO {
  ghiChu: string;

  @IsNotEmpty()
  maKhachHang: string;

  @IsNotEmpty()
  dsTruyenDuocThue: ThemTruyenDuocThueDTO[];
}
