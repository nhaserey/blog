import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt.guard';

@ApiTags('Auth Routes')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async verifyUser(@Body() reqBody: LoginDTO): Promise<string> {
    return this.authService.authentication(reqBody);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile() {
    return "User's Profile";
  }

  @Get('refresh')
  async refreshToken() {
    return 'Token Refreshed';
  }
}
