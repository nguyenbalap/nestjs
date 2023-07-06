import { Body, Controller, Post, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

export type SignInType = {
  email: string;
  password: string;
};

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  signIn(@Body() body: SignInType) {
    return this.authService.signIn(body.email, body.password);
  }
}
