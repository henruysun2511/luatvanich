import { Controller, Post, Body, Req, Res, HttpCode, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/request/login.dto';
import { AuthResponseDto } from './dto/response/auth-response.dto';
import { SwaggerDoc } from '../../common/swagger/swagger-doc';
import { ApiResponse } from '../../common/response/api-response';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RefreshTokenExpiredException } from './exceptions/auth.exception';

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
      path: '/api/v1/admin/auth',
    };
  }

  /**
   * POST /api/v1/admin/auth/login
   * Đăng nhập email + password → accessToken + refreshToken (httpOnly cookie)
   */
  @Post('login')
  @Public()
  @HttpCode(200)
  @SwaggerDoc({ summary: 'Đăng nhập', bodyType: LoginDto, responseType: AuthResponseDto })
  async login(@Body() dto: LoginDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.login(dto, req.headers['user-agent'], req.ip);

    res.cookie('refreshToken', result.refreshToken, this.getCookieOptions());

    return ApiResponse.success(
      { accessToken: result.accessToken, user: result.user },
      'Đăng nhập thành công',
    );
  }

  /**
   * POST /api/v1/admin/auth/refresh
   * Đổi refresh token (từ cookie) lấy access token mới
   */
  @Post('refresh')
  @Public()
  @HttpCode(200)
  @SwaggerDoc({ summary: 'Làm mới access token' })
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const rawToken = req.cookies?.refreshToken;
    if (!rawToken) {
      throw new RefreshTokenExpiredException('Không tìm thấy phiên đăng nhập');
    }
    const result = await this.authService.refresh(rawToken);

    res.cookie('refreshToken', result.refreshToken, this.getCookieOptions());

    return ApiResponse.success(
      { accessToken: result.accessToken, user: result.user },
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
    res.clearCookie('refreshToken', { path: '/api/v1/admin/auth' });
    await this.authService.logout(userId);
    return ApiResponse.noContent('Đăng xuất thành công');
  }

  /**
   * GET /api/v1/admin/auth/me
   */
  @Get('me')
  @SwaggerDoc({ summary: 'Thông tin tài khoản hiện tại', bearerAuth: true })
  me(@CurrentUser() user: any) {
    return ApiResponse.success(user, 'OK');
  }
}
