import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    {
      ...JwtModule.register({
        secret: 'super secret',
        // TODO change expiresIn
        signOptions: { expiresIn: '12000s' },
      }),
      global: true,
    },
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
