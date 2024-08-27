import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ContactUsService } from './contact-us.service';
import { CaptchaService } from '../captcha/captcha.service';

@Controller('contact')  
export class ContactUsController {
  constructor(
    private readonly contactUsService: ContactUsService,
    private readonly captchaService: CaptchaService,
  ) {}

  @Post('submit') 
  async submitForm(@Body() body: any) {
    const { token, firstname, lastname, subject, email, phoneNumber, countryCode, message } = body;

    const isValidCaptcha = await this.captchaService.validateCaptcha(token);

    if (!isValidCaptcha) {
      throw new BadRequestException('Invalid captcha');
    }

    await this.contactUsService.saveContactForm({
      firstname,
      lastname,
      subject,
      email,
      phoneNumber,
      countryCode,
      message,
    });

    return { message: 'Form submitted successfully' };
  }
}