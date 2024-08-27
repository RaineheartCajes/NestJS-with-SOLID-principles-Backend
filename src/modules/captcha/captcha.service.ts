import { Injectable, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CaptchaService {
  constructor(private readonly httpService: HttpService) {}

  async validateCaptcha(token: string): Promise<boolean> {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const response = await lastValueFrom(
      this.httpService.post(
        `https://www.google.com/recaptcha/api/siteverify`,
        {},
        {
          params: {
            secret: secretKey,
            response: token,
          },
        },
      ),
    );

    if (!response.data.success) {
      throw new BadRequestException('Invalid captcha');
    }

    return response.data.success;
  }
}
