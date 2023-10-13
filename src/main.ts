import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

class App {
  public app: INestApplication<any>;

  constructor() {
    this.bootstrap();
  }

  private async bootstrap() {
    const app = await NestFactory.create(AppModule, { abortOnError: false });
    await app.listen(3000);
  }
}
new App();
