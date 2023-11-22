import { IsNotEmpty } from 'class-validator';
import { ThemTruyenDuocTraDTO } from 'src/module/truyenDuocTra/dto';

export class TaoHoaDonDTO {
  @IsNotEmpty()
  dsTruyenCanTra: ThemTruyenDuocTraDTO[];

  ghiChu: string;
}
