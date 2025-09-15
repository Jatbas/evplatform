import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';


@Injectable()
export class NotEmptyBodyPipe implements PipeTransform
{
    transform(value: any)
    {
        // Check for empty object
        if (!value || Object.keys(value).length === 0)
        {
            throw new BadRequestException('Request body cannot be empty');
        }


        // Check if all property values are undefined
        const allUndefined = Object.values(value).every(v => v === undefined);

        if (allUndefined)
        {
            throw new BadRequestException('Request body cannot be empty');
        }


        return value;
    }
}