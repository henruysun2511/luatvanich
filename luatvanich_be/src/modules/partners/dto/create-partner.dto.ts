import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsUrl, IsInt, IsBoolean } from 'class-validator';

export class CreatePartnerDto {
  @ApiProperty({ description: 'Tên đối tác / ngân hàng / tập đoàn', example: 'Ngân hàng Công thương Trung Quốc (ICBC)' })
  @IsString()
  @IsNotEmpty({ message: 'Tên đối tác không được để trống' })
  name: string;

  @ApiProperty({ description: 'Đường dẫn logo đối tác' })
  @IsString()
  @IsNotEmpty({ message: 'Logo đối tác không được để trống' })
  logoUrl: string;

  @ApiProperty({ description: 'Đường dẫn website đối tác', required: false })
  @IsOptional()
  @IsString()
  websiteUrl?: string;

  @ApiProperty({ description: 'Thứ tự hiển thị', default: 0, required: false })
  @IsOptional()
  @IsInt()
  displayOrder?: number;

  @ApiProperty({ description: 'Kích hoạt hiển thị', default: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
