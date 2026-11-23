import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsUUID,
  MaxLength,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ContactChannel } from '../../enums/contact-channel.enum';

export class CreateAttachmentInputDto {
  @ApiProperty({ description: 'Tên tệp gốc', example: 'hop_dong_kinh_te.pdf' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  fileName: string;

  @ApiProperty({ description: 'URL tệp trên Cloudinary', example: 'https://res.cloudinary.com/...' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  fileUrl: string;

  @ApiPropertyOptional({ description: 'MIME Type', example: 'application/pdf' })
  @IsOptional()
  @IsString()
  fileType?: string;

  @ApiPropertyOptional({ description: 'Kích thước tệp (bytes)', example: 1048576 })
  @IsOptional()
  fileSizeBytes?: number;
}

export class CreateConsultationDto {
  @ApiProperty({ description: 'Họ và tên khách hàng', example: 'Nguyễn Văn An' })
  @IsString()
  @IsNotEmpty({ message: 'Họ và tên không được để trống' })
  @MaxLength(200)
  fullName: string;

  @ApiPropertyOptional({ description: 'Tên công ty/doanh nghiệp', example: 'Công ty TNHH Đầu tư Hoa - Việt' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  companyName?: string;

  @ApiProperty({ description: 'Số điện thoại liên hệ', example: '0901234567' })
  @IsString()
  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  @MaxLength(50)
  phone: string;

  @ApiPropertyOptional({ description: 'Địa chỉ Email', example: 'khachhang@example.com' })
  @IsOptional()
  @IsEmail({}, { message: 'Định dạng email không hợp lệ' })
  @MaxLength(255)
  email?: string;

  @ApiPropertyOptional({
    description: 'Kênh liên hệ ưu tiên',
    enum: ContactChannel,
    default: ContactChannel.PHONE,
  })
  @IsOptional()
  @IsEnum(ContactChannel)
  contactChannel?: ContactChannel = ContactChannel.PHONE;

  @ApiPropertyOptional({ description: 'ID WeChat hoặc Zalo', example: 'wxid_123456' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  contactChannelId?: string;

  @ApiPropertyOptional({ description: 'Khung giờ tiện liên hệ', example: 'Buổi sáng (8h - 11h)' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  preferredContactTime?: string;

  @ApiPropertyOptional({ description: 'ID lĩnh vực pháp lý cần tư vấn' })
  @IsOptional()
  @IsUUID('4', { message: 'Mã lĩnh vực pháp lý không hợp lệ' })
  practiceAreaId?: string;

  @ApiPropertyOptional({ description: 'ID luật sư chỉ định tư vấn' })
  @IsOptional()
  @IsUUID('4', { message: 'Mã luật sư không hợp lệ' })
  lawyerId?: string;

  @ApiPropertyOptional({ description: 'Ngôn ngữ tư vấn mong muốn (vi hoặc zh-CN)', example: 'vi' })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  languageCode?: string = 'vi';

  @ApiPropertyOptional({ description: 'Tiêu đề tóm tắt yêu cầu' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @ApiProperty({ description: 'Nội dung chi tiết yêu cầu tư vấn' })
  @IsString()
  @IsNotEmpty({ message: 'Nội dung tư vấn không được để trống' })
  content: string;

  @ApiProperty({ description: 'Khách hàng xác nhận đồng ý chính sách bảo mật dữ liệu cá nhân' })
  @IsBoolean()
  consent: boolean;

  @ApiPropertyOptional({
    description: 'Danh sách tệp hồ sơ đính kèm (tối đa 5 tệp)',
    type: [CreateAttachmentInputDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAttachmentInputDto)
  attachments?: CreateAttachmentInputDto[];
}
