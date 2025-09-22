import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import { AllExceptionsFilter } from '@common/filters/all-exceptions.filter';


async function bootstrap()
{
    const app = await NestFactory.create(AppModule);

    const config = app.get(ConfigService);


    app.useGlobalPipes(

        new ValidationPipe({
            whitelist: true,              // strips properties not in DTO
            forbidNonWhitelisted: true,   // throws if unknown props are sent
            transform: true,              // auto-convert types if possible
        })
    );


    app.useGlobalInterceptors(new ResponseInterceptor());

    app.useGlobalFilters(new AllExceptionsFilter());


    app.setGlobalPrefix('evplatform'); // Base route


    // Enable CORS - Since this is not production, it eases development of side projects
    app.enableCors({ origin: true });


    const port = config.get<number>('PORT', 3000);

    await app.listen(port);
}


bootstrap();