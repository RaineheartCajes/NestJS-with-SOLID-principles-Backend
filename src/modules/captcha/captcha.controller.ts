import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { CaptchaService } from './captcha.service';

@Controller('captcha')
export class CaptchaController {
  constructor(private readonly captchaService: CaptchaService) {}

  @Post('validate')
  async validateCaptcha(@Body('token') token: string) {
    const isValidCaptcha = await this.captchaService.validateCaptcha(token);

    if (!isValidCaptcha) {
      throw new BadRequestException('Invalid captcha');
    }

    return { message: 'Captcha validated successfully' };
  }
}