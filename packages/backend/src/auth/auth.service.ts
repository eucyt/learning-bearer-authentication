import {Injectable, UnauthorizedException} from '@nestjs/common';
import {User} from '@prisma/client';
import {PrismaService} from "@src/prisma/prisma.service";
import {compareSync} from 'bcrypt';
import {JwtService} from "@nestjs/jwt";

interface JwtPayload {
  id: number;
  name: string;
}

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService, private jwtService: JwtService) {
  }


  async login(email: string, password: string): Promise<{ accessToken: string, refreshToken: string }> {
    const user = await this.validateUser(email, password)
    const payload: JwtPayload = {id: user.id, name: user.name};

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }


  async validateUser(email: string, password: string): Promise<User> {
    const user: User | null = await this.prismaService.user.findUnique({where: {email}});
    if (user && compareSync(password, user.password)) {
      return user
    } else {
      throw new UnauthorizedException('Email or password is invalid.')
    }
  }
}
