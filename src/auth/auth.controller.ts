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
  HttpException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dtos/createUser.dto';
import { UserService } from 'src/user/user.service';
import { UserResponse } from 'src/user/userResponse';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { StatusCodes } from 'http-status-codes';
import { LoginResponse } from './authResponse';
import { isPasswordCorrect } from 'src/utils/hash';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  /**
   * Log in for previously created user
   */
  @Public()
  @ApiOperation({ summary: 'Log in' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOkResponse({
    description: 'Successful operation',
    type: LoginResponse,
  })
  @ApiBadRequestResponse({
    description: ' Bad request. Body does not contain required fields',
  })
  @ApiForbiddenResponse({ description: 'Wrong login and/or password' })
  @UsePipes(new ValidationPipe())
  async login(@Body() loginDto: CreateUserDto) {
    const user = await this.userService.getUserByLogin(loginDto.login);
    if (!user) {
      throw new HttpException(
        'User with this login does not exist',
        StatusCodes.FORBIDDEN,
      );
    }
    const isCorrectPassword = await isPasswordCorrect(
      loginDto.password,
      user.password,
    );
    if (!isCorrectPassword) {
      throw new HttpException('Wrong password', StatusCodes.FORBIDDEN);
    }
    return this.authService.login(loginDto.login, loginDto.password);
  }

  /**
   * Register new user
   */
  @Public()
  @Post('signup')
  @ApiOperation({ summary: 'Register user' })
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
