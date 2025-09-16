import {Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any>
{
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>
    {
        if (context.getType().toString() === 'graphql')
        {
            // Skip wrapping for GraphQL responses
            return next.handle();
        }


        return next.handle().pipe(

            map(data => ({

                result: true,
                data,
            })),
        );
    }
}