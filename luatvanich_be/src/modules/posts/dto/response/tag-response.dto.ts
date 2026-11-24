import { ApiProperty } from '@nestjs/swagger';

export class TagPublicDto {
  @ApiProperty({ description: 'UUID', example: "a3da8be5-519e-4459-930f-ea3bd1eaf15c" })
  id: string;

  @ApiProperty({ description: 'Tên hiển thị', example: "Đầu tư FDI" })
  name: string;

  @ApiProperty({ description: 'Đường dẫn theo ngôn ngữ', example: "dau-tu-fdi" })
  slug: string;

  @ApiProperty({ description: 'Màu thẻ', example: "#0284c7", type: String, nullable: true })
  colorHex: string | null;
}
