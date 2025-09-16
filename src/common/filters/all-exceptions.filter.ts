import {ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { GraphQLError } from 'graphql';


@Catch()
export class AllExceptionsFilter implements ExceptionFilter
{
    catch(exception: unknown, host: ArgumentsHost)
    {
        const contextType = host.getType().toString();

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = ((exception instanceof HttpException) ? exception.getResponse() : 'Internal server error');


        if (contextType === 'graphql')
        {
            const graphqlMessage = (typeof message === 'string') ? message : (message as any)?.message || message;

            throw new GraphQLError(graphqlMessage, {
                extensions: { code: status, result: false},
            });
        }


        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        response.status(status).json({

            result: false,
            error: ((typeof message === 'string') ? message : (message as any).message || message)
        });
    }
}