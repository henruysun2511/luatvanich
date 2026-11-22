import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PERMISSIONS } from '../../common/constants/permission.constant';
import { Public } from '../../common/decorators/public.decorator';
import { RequirePermission } from '../../common/decorators/require-permission.decorator';
import { ApiResponse } from '../../common/response/api-response';
import {
  CreateCredentialDto, CreateLawyerDto, LawyerLanguagesDto, LawyerQueryDto,
  PublicLawyerQueryDto, UpdateCredentialDto, UpdateLawyerDto, UpdateLawyerStatusDto,
} from './lawyers.dto';
import { LawyersService } from './lawyers.service';

@ApiTags('Lawyers (Admin)')
@ApiBearerAuth()
@Controller({ path: 'admin/lawyers', version: '1' })
export class LawyersAdminController {
  constructor(private readonly service: LawyersService) {}

  @Get()
  @RequirePermission(PERMISSIONS.LAWYERS_READ)
  async list(@Query() query: LawyerQueryDto) {
    return ApiResponse.success(await this.service.adminList(query));
  }

  @Post()
  @RequirePermission(PERMISSIONS.LAWYERS_WRITE)
  async create(@Body() dto: CreateLawyerDto) {
    return ApiResponse.created(await this.service.create(dto));
  }

  @Get(':id')
  @RequirePermission(PERMISSIONS.LAWYERS_READ)
  async detail(@Param('id', ParseUUIDPipe) id: string) {
    return ApiResponse.success(await this.service.adminDetail(id));
  }

  @Patch(':id')
  @RequirePermission(PERMISSIONS.LAWYERS_WRITE)
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateLawyerDto) {
    return ApiResponse.success(await this.service.update(id, dto));
  }

  @Patch(':id/status')
  @RequirePermission(PERMISSIONS.LAWYERS_PUBLISH)
  async updateStatus(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateLawyerStatusDto) {
    return ApiResponse.success(await this.service.update(id, dto));
  }

  @Put(':id/languages')
  @RequirePermission(PERMISSIONS.LAWYERS_WRITE)
  async updateLanguages(@Param('id', ParseUUIDPipe) id: string, @Body() dto: LawyerLanguagesDto) {
    return ApiResponse.success(await this.service.update(id, dto));
  }

  @Get(':id/credentials')
  @RequirePermission(PERMISSIONS.LAWYERS_READ)
  async credentials(@Param('id', ParseUUIDPipe) id: string) {
    return ApiResponse.success(await this.service.listCredentials(id));
  }

  @Post(':id/credentials')
  @RequirePermission(PERMISSIONS.LAWYERS_WRITE)
  async createCredential(@Param('id', ParseUUIDPipe) id: string, @Body() dto: CreateCredentialDto) {
    return ApiResponse.created(await this.service.createCredential(id, dto));
  }

  @Delete(':id')
  @RequirePermission(PERMISSIONS.LAWYERS_DELETE)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.service.remove(id);
    return ApiResponse.noContent();
  }
}

@ApiTags('Lawyer Credentials (Admin)')
@ApiBearerAuth()
@Controller({ path: 'admin/lawyer-credentials', version: '1' })
export class LawyerCredentialsAdminController {
  constructor(private readonly service: LawyersService) {}

  @Patch(':credId')
  @RequirePermission(PERMISSIONS.LAWYERS_WRITE)
  async update(@Param('credId', ParseUUIDPipe) id: string, @Body() dto: UpdateCredentialDto) {
    return ApiResponse.success(await this.service.updateCredential(id, dto));
  }

  @Delete(':credId')
  @RequirePermission(PERMISSIONS.LAWYERS_WRITE)
  async remove(@Param('credId', ParseUUIDPipe) id: string) {
    await this.service.removeCredential(id);
    return ApiResponse.noContent();
  }
}

@ApiTags('Lawyers (Public)')
@Public()
@Controller({ path: 'lawyers', version: '1' })
export class LawyersController {
  constructor(private readonly service: LawyersService) {}

  @Get()
  async list(@Query() query: PublicLawyerQueryDto, @Req() request: Request) {
    return ApiResponse.success(await this.service.publicList(query, request.lang));
  }

  @Get('featured')
  async featured(@Query() query: PublicLawyerQueryDto, @Req() request: Request) {
    return ApiResponse.success(await this.service.publicList(query, request.lang, true));
  }

  @Get(':slug')
  async detail(@Param('slug') slug: string, @Req() request: Request) {
    return ApiResponse.success(await this.service.publicDetail(slug, request.lang));
  }
}
