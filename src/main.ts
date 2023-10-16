import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';

class App {
  private app: INestApplication<any>;

  constructor() {
    this.bootstrap();
  }

  private async bootstrap() {
    this.app = await NestFactory.create(AppModule, { abortOnError: false });
    this.app.useGlobalPipes(new ValidationPipe());
    await this.app.listen(3000);
  }
}
new App();
