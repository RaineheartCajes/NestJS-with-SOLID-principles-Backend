import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',  
    allowedHeaders: 'Content-Type,Authorization',
    methods: 'GET,POST,PUT,DELETE',  

    credentials: true,               
  });
  await app.listen(2000);
}

bootstrap();
