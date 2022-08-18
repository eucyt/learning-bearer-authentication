import {Controller, Get, Post, Request} from '@nestjs/common';
import {AuthService} from "@src/auth/auth.service";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }


  @Post('login')
  async login(@Request() req: { name: string, email: string }) {
    return await this.authService.login(req.name, req.email)
  }


  @Get('test')
  async test() {
    return 'Authorized user'
  }
}
