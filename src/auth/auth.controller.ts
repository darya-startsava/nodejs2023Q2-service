import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/createUser.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: CreateUserDto) {
    return this.authService.login(loginDto.login, loginDto.password);
  }
}
