import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ConsultationNoteDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  consultationRequestId: string;

  @ApiPropertyOptional()
  authorId?: string | null;

  @ApiPropertyOptional()
  authorName?: string | null;

  @ApiProperty()
  note: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
