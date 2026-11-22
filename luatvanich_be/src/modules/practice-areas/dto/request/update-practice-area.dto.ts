import { PartialType } from '@nestjs/swagger';
import { CreatePracticeAreaDto } from './create-practice-area.dto';

export class UpdatePracticeAreaDto extends PartialType(CreatePracticeAreaDto, { skipNullProperties: false }) {}
