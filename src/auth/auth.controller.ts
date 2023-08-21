import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dtos/createUser.dto';
import { UserResponse } from 'src/user/userResponse';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: CreateUserDto) {
    return this.authService.login(loginDto.login, loginDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({
    description: 'The user has been created',
    type: UserResponse,
  })
  @ApiBadRequestResponse({
    description: ' Bad request. Body does not contain required fields',
  })
  @UsePipes(new ValidationPipe())
  async signup(@Body() registerDto: CreateUserDto) {
    return this.authService.signup(registerDto);
  }
}