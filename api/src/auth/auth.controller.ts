import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; pass: string }) {
    const user = await this.authService.validateUser(body.email, body.pass);
    return this.authService.login(user);
  }

  @Get('test')
  async test(){
    console.log('test')
  }
  /*
  @Post('encrypt')
  async encrypt(@Body() body: { pass: string }) {
    console.log('body',body)
    const encryptedPass = await this.authService.hashPassword(body.pass);
    return encryptedPass
  }
  */
}
