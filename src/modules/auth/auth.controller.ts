import { Controller, Post, Body  } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { ApiBaseResponse } from 'src/common/decorators/api-response.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

   @Post('login')
  @ApiOperation({ summary: '[ Login via Trakcare ]' })
  @ApiBaseResponse(Object) // เดี๋ยวคุณ refactor เป็น DTO ทีหลังได้
  @ResponseMessage('Login success')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
