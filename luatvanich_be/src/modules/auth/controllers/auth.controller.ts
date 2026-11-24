import { Controller, Post, Patch, Body, Req, Res, HttpCode, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/request/login.dto';
import { ChangePasswordDto } from '../dto/request/change-password.dto';
import { UpdateProfileDto } from '../dto/request/update-profile.dto';
import { AuthResponseDto } from '../dto/response/auth-response.dto';
import { UserResponseDto } from '../../users/dto/response/user.dto';
import { SwaggerDoc } from '../../../common/swagger/swagger-doc';
import { ApiResponse } from '../../../common/response/api-response';
import { Public } from '../../../common/decorators/public.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { RefreshTokenExpiredException } from '../exceptions/auth.exception';

@ApiTags('Auth')
@Controller({ path: 'admin/auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private getCookieOptions() {
    const isProd = process.env.NODE_ENV === 'production';
    return {
      httpOnly: true,
      secure: isProd,
      sameSite: (isProd ? 'strict' : 'lax') as 'strict' | 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    };
  }

  /**
   * POST /api/v1/admin/auth/login
   * Đăng nhập email + password → accessToken + refreshToken (httpOnly cookie & response body)
   */
  @Post('login')
  @Public()
  @HttpCode(200)
  @SwaggerDoc({ summary: 'Đăng nhập', bodyType: LoginDto, responseType: AuthResponseDto })
  async login(@Body() dto: LoginDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.login(dto, req.headers['user-agent'], req.ip);

    res.cookie('refreshToken', result.refreshToken, this.getCookieOptions());

    return ApiResponse.success(
      { accessToken: result.accessToken, refreshToken: result.refreshToken, user: result.user },
      'Đăng nhập thành công',
    );
  }

  /**
   * POST /api/v1/admin/auth/refresh
   * Đổi refresh token (từ cookie hoặc body/header) lấy access token mới
   */
  @Post('refresh')
  @Public()
  @HttpCode(200)
  @SwaggerDoc({ summary: 'Làm mới access token', responseType: AuthResponseDto })
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body('refreshToken') bodyToken?: string,
  ) {
    const rawToken =
      req.cookies?.refreshToken ||
      bodyToken ||
      (req.headers['x-refresh-token'] as string);
    if (!rawToken) {
      throw new RefreshTokenExpiredException('Không tìm thấy phiên đăng nhập');
    }
    const result = await this.authService.refresh(rawToken);

    res.cookie('refreshToken', result.refreshToken, this.getCookieOptions());

    return ApiResponse.success(
      { accessToken: result.accessToken, refreshToken: result.refreshToken, user: result.user },
      'Làm mới token thành công',
    );
  }

  /**
   * POST /api/v1/admin/auth/logout
   */
  @Post('logout')
  @HttpCode(200)
  @SwaggerDoc({ summary: 'Đăng xuất', bearerAuth: true })
  async logout(@CurrentUser('id') userId: string, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('refreshToken', { path: '/' });
    await this.authService.logout(userId);
    return ApiResponse.noContent('Đăng xuất thành công');
  }

  /**
   * POST /api/v1/admin/auth/change-password
   * Đổi mật khẩu tài khoản hiện tại
   */
  @Post('change-password')
  @HttpCode(200)
  @SwaggerDoc({
    summary: 'Đổi mật khẩu tài khoản hiện tại',
    bodyType: ChangePasswordDto,
    bearerAuth: true,
  })
  async changePassword(
    @CurrentUser('id') userId: string,
    @Body() dto: ChangePasswordDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.clearCookie('refreshToken', { path: '/' });
    await this.authService.changePassword(userId, dto);
    return ApiResponse.noContent('Đổi mật khẩu thành công. Vui lòng đăng nhập lại.');
  }

  /**
   * GET /api/v1/admin/auth/me
   */
  @Get('me')
  @SwaggerDoc({ summary: 'Thông tin tài khoản hiện tại', responseType: UserResponseDto, bearerAuth: true })
  async me(@CurrentUser('id') userId: string) {
    const user = await this.authService.getProfile(userId);
    return ApiResponse.success(user, 'OK');
  }

  /**
   * PATCH /api/v1/admin/auth/profile
   * Cập nhật thông tin cá nhân của tài khoản hiện tại
   */
  @Patch('profile')
  @HttpCode(200)
  @SwaggerDoc({
    summary: 'Cập nhật thông tin cá nhân',
    bodyType: UpdateProfileDto,
    responseType: UserResponseDto,
    bearerAuth: true,
  })
  async updateProfile(
    @CurrentUser('id') userId: string,
    @Body() dto: UpdateProfileDto,
  ) {
    const data = await this.authService.updateProfile(userId, dto);
    return ApiResponse.success(data, 'Cập nhật thông tin cá nhân thành công');
  }
}
