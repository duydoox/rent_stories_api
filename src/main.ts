import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';

class App {
  public app: INestApplication<any>;

  constructor() {
    this.bootstrap();
  }

  private async bootstrap() {
    const app = await NestFactory.create(AppModule, { abortOnError: false });
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
  }
}
new App();
