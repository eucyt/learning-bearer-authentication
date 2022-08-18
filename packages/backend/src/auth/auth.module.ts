import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {MyJwtService} from "@src/auth/my-jwt.service";

@Module({
  providers: [AuthService, MyJwtService]
})
export class AuthModule {
}
