import { Module } from '@nestjs/common';
import { PrismaModule } from './modules';
import { CalendarModule } from './modules';
import { CaptchaModule } from './modules';
import { ContactUsModule } from './modules';
import { ConfigModule } from '@nestjs/config'; 

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CalendarModule,
    PrismaModule,
    CaptchaModule,
    ContactUsModule
  ],
})
export class AppModule {}
