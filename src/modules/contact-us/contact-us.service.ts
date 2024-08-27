import { Injectable, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContactUsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async validateCaptcha(token: string): Promise<boolean> {
    const secretKey = this.configService.get<string>('RECAPTCHA_SECRET_KEY');
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

  async saveContactForm(formData: {
    firstname: string;
    lastname: string;
    subject: string;
    email: string;
    phoneNumber: string;
    countryCode: string;
    message: string;
  }) {
    return this.prisma.contactUs.create({
      data: formData,
    });
  }
}
