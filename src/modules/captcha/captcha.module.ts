import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CaptchaService } from './captcha.service';
import { CaptchaController } from './captcha.controller';

@Module({
  imports: [
    HttpModule,
    ConfigModule,  
  ],
  providers: [CaptchaService],
  controllers: [CaptchaController],
  exports: [CaptchaService],  
})
export class CaptchaModule {}