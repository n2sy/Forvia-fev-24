import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authSer: AuthService) {}

  @Post('signup')
  async seConnecter(@Body() body, @Res() response: Response) {
    let result = await this.authSer.signup(body);
    return response.json(result);
  }
  @Post('signin')
  async login(@Body() body, @Res() response: Response) {
    let result = await this.authSer.signin(body);
    return response.json({ message: 'User logged', result });
  }
}
