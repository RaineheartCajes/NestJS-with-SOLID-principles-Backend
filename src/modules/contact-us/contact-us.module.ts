import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContactUsService } from './contact-us.service';
import { ContactUsController } from './contact-us.controller';
import { CaptchaModule } from '../captcha/captcha.module';
import { HttpModule} from '@nestjs/axios';

@Module({
  imports: [CaptchaModule, HttpModule], 
  providers: [ContactUsService, PrismaService],
  controllers: [ContactUsController],
})
export class ContactUsModule {}