import { IsNotEmpty } from 'class-validator';

export class GetThongKeDTO {
  @IsNotEmpty()
  ngayBatDau: string;

  @IsNotEmpty()
  ngayKetThuc: string;
}

export class ChiTietThongKeDto extends GetThongKeDTO {
  @IsNotEmpty()
  maTruyen: string;
}
