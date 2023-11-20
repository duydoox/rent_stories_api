import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './dto';
import { Public } from 'src/decorator/public.decorator';

@Controller('auth')
@Public()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body() body: RegisterDTO) {
    return this.authService.register(body);
  }

  @Post('/login')
  @UseInterceptors(ClassSerializerInterceptor)
  login(@Body() body: LoginDTO) {
    return this.authService.login(body);
  }
}
