import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: [
      'https://gen-lang-client-0373102396.web.app',   // Firebase frontend URL
      'http://localhost:4200',                        // Local testing URL
      'https://votaria-app.com.br',                   // Domain
      'https://www.votaria-app.com.br'                // Domain with www
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.setGlobalPrefix('api');
  
  const port = process.env.PORT ?? 8080;
  await app.listen(port, '0.0.0.0'); 
  
  console.log(`Backend running on port: ${port}`);
}
bootstrap();