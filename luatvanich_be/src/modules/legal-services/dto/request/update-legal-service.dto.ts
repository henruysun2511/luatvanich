import { PartialType } from '@nestjs/swagger';
import { CreateLegalServiceDto } from './create-legal-service.dto';

export class UpdateLegalServiceDto extends PartialType(CreateLegalServiceDto) {}
