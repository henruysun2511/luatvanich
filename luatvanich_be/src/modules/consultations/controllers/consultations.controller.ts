import {
  Controller,
  Post,
  Body,
  Ip,
  Headers,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../../common/decorators/public.decorator';
import { SwaggerDoc } from '../../../common/swagger/swagger-doc';
import { ApiResponse } from '../../../common/response/api-response';
import { ConsultationsService } from '../services/consultations.service';
import { CreateConsultationDto } from '../dto/request/create-consultation.dto';
import { ConsultationPublicResponseDto } from '../dto/response/consultation-public.dto';

@ApiTags('Consultations (Public)')
@Controller({ path: 'consultations', version: '1' })
export class ConsultationsController {
  constructor(private readonly service: ConsultationsService) {}

  /** POST /api/v1/consultations */
  @Post()
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @SwaggerDoc({
    summary: 'Public: Gửi yêu cầu tư vấn pháp lý mới',
    bodyType: CreateConsultationDto,
    responseType: ConsultationPublicResponseDto,
    status: 201,
  })
  async create(
    @Body() dto: CreateConsultationDto,
    @Ip() clientIp: string,
    @Headers('user-agent') userAgent: string,
  ) {
    const data = await this.service.create(dto, clientIp, userAgent);
    return ApiResponse.created(data, 'Gửi yêu cầu tư vấn thành công');
  }
}
