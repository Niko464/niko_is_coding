import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { AuthService } from './auth.service';
import { LocalStrategy } from './jwt/local.strategy';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    //NOTE: protect all routes with JwtAuthGuard
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
