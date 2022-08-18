import {Injectable} from '@nestjs/common';

@Injectable()
export class MyJwtService {
  sign(payload: any, expiresIn: any): string {
    return ''
  }
}
