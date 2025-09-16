import { Injectable, Inject, PipeTransform, BadRequestException } from '@nestjs/common';

import { HashidsLibInterface } from '@libs/hashids/hashids.interface';


@Injectable()
export class ParseAndDecodeIdUndefinedPipe implements PipeTransform
{
    constructor(

        @Inject('HashidsLib')
        private readonly hashidsLib: HashidsLibInterface
    ) {}


    /***/


    transform(id: any): number | undefined
    {
        if (!id)
        {
            return undefined;
        }


        if (typeof id !== 'string' || id.length !== 20)
        {
            throw new BadRequestException('Invalid id format');
        }


        const decoded = this.hashidsLib.decode(id);

        if (decoded === null || isNaN(decoded))
        {
            throw new BadRequestException('Invalid id format');
        }


        return decoded;
    }
}