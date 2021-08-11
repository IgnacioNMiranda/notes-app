import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Public } from '../../../decorators/public.decorator';
import { UserCredentialsDTO } from '../dto/user-credentials.dto';
import { AuthService } from '../providers/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  async login(@Body() userCredentials: UserCredentialsDTO) {
    return this.authService.login(userCredentials);
  }

  @Get('validateToken')
  @Public()
  @HttpCode(HttpStatus.OK)
  async validateToken(@Req() req: Request) {
    return req.user;
  }
}
