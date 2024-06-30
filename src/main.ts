import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as mustache from 'mustache-express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ValidationFilter } from './validation/validation.filter';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // overwrite loggerService to winston
  const loggerService = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(loggerService);



  app.use(cookieParser('SECRETKEY'));
  app.set('views', __dirname + '/../views');
  app.set('view engine', 'html');
  app.engine('html', mustache());

  app.useGlobalFilters(new ValidationFilter());

  const configService = app.get(ConfigService);

  console.info(`Aplikasi berjalan di http://localhost:${configService.get("PORT")}`);

  await app.listen(configService.get("PORT"));
}
bootstrap();
