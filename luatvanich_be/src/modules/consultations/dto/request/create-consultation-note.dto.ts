import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConsultationNoteDto {
  @ApiProperty({ description: 'Nội dung ghi chú tiến trình xử lý', example: 'Đã gọi điện tư vấn lần 1, hẹn gửi báo giá chi tiết qua WeChat.' })
  @IsString()
  @IsNotEmpty({ message: 'Nội dung ghi chú không được để trống' })
  @MaxLength(2000)
  note: string;
}
