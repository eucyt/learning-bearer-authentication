import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {AuthService} from "@src/auth/auth.service";
import {AuthGuard} from "@nestjs/passport";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  async login(@Body() req: { email: string, password: string }) {
    return await this.authService.login(req.email, req.password)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('test')
  async test() {
    return 'Authorized user'
  }
}
