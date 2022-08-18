import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {JwtModule} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {PrismaService} from "@src/prisma/prisma.service";
import {JwtStrategy} from "@src/auth/jwt.strategy";
import {PassportModule} from "@nestjs/passport";
import {AuthController} from "@src/auth/auth.controller";

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET_KEY'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, PrismaService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {
}
