import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Public } from '../../../common/decorators/public.decorator';
import { ApiResponse } from '../../../common/response/api-response';
import { FaqsService } from '../faqs.service';

@ApiTags('FAQs (Public)')
@Controller({ path: 'faqs', version: '1' })
export class FaqsController {
  constructor(private readonly service: FaqsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Lấy danh sách câu hỏi thường gặp song ngữ' })
  @ApiQuery({ name: 'lang', required: false, example: 'vi' })
  async getPublicFaqs(@Query('lang') lang?: string) {
    const data = await this.service.getPublicFaqs(lang || 'vi');
    return ApiResponse.success(data);
  }
}
