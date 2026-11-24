import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional } from 'class-validator';

export class UpdateSettingsDto {
  @ApiProperty({
    description: 'Đối tượng cấu hình key-value cần cập nhật',
    example: {
      hotline_vn: '0961 888 888',
      hotline_cn: '+86 771 888888',
      email_contact: 'contact@luatvanich.vn',
      wechat_id: 'LuatVanIch_Official',
    },
  })
  @IsObject()
  settings: Record<string, string>;

  @ApiProperty({ description: 'Phân nhóm tùy chọn (nếu chỉ cập nhật một nhóm cụ thể)', required: false })
  @IsOptional()
  group?: string;
}
