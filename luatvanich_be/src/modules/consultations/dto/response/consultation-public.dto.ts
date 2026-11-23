import { ApiProperty } from '@nestjs/swagger';

export class ConsultationPublicResponseDto {
  @ApiProperty({ description: 'Mã định danh yêu cầu tư vấn' })
  id: string;

  @ApiProperty({ description: 'Thông báo xác nhận tiếp nhận thành công' })
  message: string;

  @ApiProperty({ description: 'Thời gian tiếp nhận' })
  createdAt: Date;
}
